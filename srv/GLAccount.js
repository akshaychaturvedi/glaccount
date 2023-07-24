// @ts-nocheck
const cds = require('@sap/cds');
const { randomUUID } = require('crypto');
const { type } = require('os');
const PassThrough = require('stream').PassThrough;
const XLSX = require('xlsx');

module.exports = async function (srv) {

    const { GLAccounts, GLMappedAccounts, GLAccountData } = this.entities

    this.on('downloadExcel', async req => {
        let glData = await cds.run( SELECT.from ('GLAccount_db_tables_GLAccountData') );
        return JSON.stringify(glData);
    })
    
    // Set default data
    this.before('CREATE', GLAccounts, async req => {
        try {
            let dataArray = Array.isArray(req.data);
            if (!dataArray) {
                req.data.chartOfAccounts = 'BEPS';
            }
            else {
                for (let i = 0; i < req.data.length; i++) {
                    req.data[i].chartOfAccounts = 'BEPS';
                }
            }
        } catch (error) {
            console.error(error)
        }
    })

    this.on("READ", "ChartofAccountsVH", async (req) => {
        
        let query = await SELECT.from ('GLAccount_db_tables_ChartofAccountsView');
        query.$count = query.length;
        return query;

    });

    this.on("READ", "SourceChartofAccountsVH", async (req) => {
        
        let query = await SELECT.from ('GLAccount_db_tables_SourceChartofAccountsView');
        query.$count = query.length;
        return query;

    });
    

    srv.on('PUT', "ExcelUpload", async (req, next) => {
         
        // Check 
        if (req.data.excel) {

            var entity = req.headers.slug;
            
            const stream = new PassThrough();
            
            var buffers = [];
            
            req.data.excel.pipe(stream);
            
            await new Promise((resolve, reject) => {

                stream.on('data', dataChunk => {
                    buffers.push(dataChunk);
                });
                
                stream.on('end', async () => {

                    var buffer = Buffer.concat(buffers);
                    var workbook = XLSX.read(buffer, { type: 'buffer' })

                    const worksheet = workbook.SheetNames[0];

                    let data = [];

                    const sheets = workbook.SheetNames

                    for (let i = 0; i < sheets.length; i++) {
                        const temp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]])
                        temp.forEach((res) => {
                            data.push(res)
                        })
                    }

                    if (data) {
                        const responseCall = await CallEntity(entity, data);
                        if (responseCall == -1)
                            reject(req.error(400, JSON.stringify(data)));
                        else {
                            resolve(req.notify({
                                message: 'Upload Successful',
                                status: 200
                            }));
                        }
                    }
                });
            });
        } else {
            return next();
        }
    });

    function rowExists(row,table) {
        
        var glID = '';

        for (var i = 0; i < table.length; i++) {
            if (row.chartOfAccounts == table[i].chartOfAccounts && row.glaccount == table[i].glaccount) {
                glID = table[i].ID;                            
            }    
        }
        return glID;
    }

    async function CallEntity(entity, data) {

        // Table Declarations
        var GLAccountsData = [];
        var NonGLAccountsData = [];

        // Entity Declarations
        const { GLAccounts, GLMappedAccounts } = cds.entities;
        
        // Establish connection to the service
        let srv = await cds.connect.to('GLAccountService');

        // Loop at records from the excel
        for (var i = 0; i < data.length; i++)
        {   
            // Check for unique GL Account in the sheet
            var glID = rowExists(data[i],GLAccountsData);
            
            // If value is blank, GL Account is unique
            if(glID === ''){

                var GLAccountID = randomUUID();

                var GLAccount = {
                    "ID" : GLAccountID,
                    "chartOfAccounts" : data[i].chartOfAccounts,
                    "glaccount" : data[i].glaccount,
                    "descr" : data[i].descr,
                    "accountType" : data[i].accountType
                } 

                // Check in DB if the GL Account exists
                let selectGLQuery = SELECT.one.from('GLAccounts').where({"KTOPL":GLAccount.chartOfAccounts, "SAKNR":GLAccount.glaccount});
                let selectGLResult = await srv.run(selectGLQuery);
                
                // If record found in DB, do not create a new GL Account
                if (!selectGLResult) {
                    GLAccountsData.push(GLAccount);
                }
                else {
                    GLAccountID = selectGLResult.ID;
                }               
            }
            else {
                GLAccountID = glID;
            }
            
            var SourceGLAccount = {
                "ID": randomUUID(),
                "sourceChartOfAccounts": data[i].sourceChartOfAccounts,
                "sourceGLAccount": data[i].sourceGLAccount,
                "sourceDescr": data[i].sourceDescr,
                "source": data[i].source,
                "glaccount_ID": GLAccountID
            }

            // Check in DB if the Source GL Account exists
            let selectSourceGLQuery = SELECT.one.from('GLMappings').where({ "sourceChartOfAccounts": SourceGLAccount.sourceChartOfAccounts, "sourceGLAccount": SourceGLAccount.sourceGLAccount, "glaccount_ID": SourceGLAccount.glaccount_ID });
            let selectSourceGLResult = await srv.run(selectSourceGLQuery);

            // If record found in DB, do not create a new GL Account
            if (!selectSourceGLResult) {
                SourceGLAccountsData.push(SourceGLAccount);
            }
        }

        // Execute INSERT query for GL Account 
        if (GLAccountsData.length) {
            const insertQuery = INSERT.into('GLAccounts').entries(GLAccountsData);
            const insertResult = await srv.run(insertQuery);
        }
        
        // Execute INSERT query for Source GL Account 
        if (SourceGLAccountsData.length) {
            const insertQuery2 = INSERT.into('GLMappedAccounts').entries(SourceGLAccountsData);
            const insertResult2 = await srv.run(insertQuery2);
        }

        return GLAccountsData; //returns response to excel upload entity
    };
}