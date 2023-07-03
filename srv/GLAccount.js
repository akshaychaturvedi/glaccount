const cds = require('@sap/cds');
const { randomUUID } = require('crypto');
const { type } = require('os');
const PassThrough = require('stream').PassThrough;
const XLSX = require('xlsx');

module.exports = function (srv) {

    const { GLAccounts, GLMappedAccounts } = this.entities

    this.before('CREATE', GLAccounts, async req => {
        try {
            if (!req.data.KTOPL) {
                req.data.KTOPL = 'BEPS';
            }
            

            // dataExists = await SELECT.one.from(GLAccounts).where({"KTOPL":req.data.KTOPL, "SAKNR":req.data.SAKNR});

            // // Check is record already exists
            // if(typeof dataExists != "undefined") 
            //     req.error(400, 'Entry already exists')

        } catch (error) {
            console.error(error)
        }
    })

    srv.on('PUT', "ExcelUpload", async (req, next) => {
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
                        const temp = XLSX.utils.sheet_to_json(
                            workbook.Sheets[workbook.SheetNames[i]])
                        temp.forEach((res) => {
                            data.push(res)
                        })
                    }

                    // const worksheetData = XLSX.utils.sheet_to_json(worksheet, { header : 1 });

                    // data.push(JSON.parse(JSON.stringify(worksheetData)));

                    // var buffer = Buffer.concat(buffers);
                    // var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
                    // let data = []
                    // const sheets = workbook.SheetNames
                    // for (let i = 0; i < sheets.length; i++) {
                    //     const temp = XLSX.utils.sheet_to_json(
                    //         workbook.Sheets[workbook.SheetNames[i]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
                    //     temp.forEach((res, index) => {
                    //         if (index === 0) return;
                    //         data.push(JSON.parse(JSON.stringify(res)))
                    //     })
                    // }
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

    // srv.before('POST', 'GLAccounts', async (req) => {
    //    //Custom validations can be put, if required before upload
    //    dataExists = await SELECT.one.from(GLAccounts).where({"KTOPL":req.data.KTOPL, "SAKNR":req.data.SAKNR});
    // });

    // srv.on('POST', 'GLAccounts', async (req) => {
    //     //return reponse to excel upload entity .
    // });
    function checkUnique(row,table) {
        
        var glID = '';

        for (var i = 0; i < table.length; i++) {
            if (row.KTOPL == table[i].KTOPL && row.SAKNR == table[i].SAKNR) {
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
            var glID = checkUnique(data[i],GLAccountsData);
            
            // If value is blank, GL Account is unique
            if(glID === ''){

                var GLAccountID = randomUUID();

                var GLAccount = {
                    "ID" : GLAccountID,
                    "KTOPL" : data[i].KTOPL,
                    "SAKNR" : data[i].SAKNR,
                    "TXT50" : data[i].TXT50,
                    "XBILK" : data[i].XBILK
                } 

                // Check in DB if the GL Account exists
                let selectGLQuery = SELECT.one.from('GLAccounts').where({"KTOPL":GLAccount.KTOPL, "SAKNR":GLAccount.SAKNR});
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
            
            var NonGLAccount = {
                "ID" : randomUUID(),
                "KTOPL_N" : data[i].KTOPL_N,
                "SAKNR_N" : data[i].SAKNR_N,
                "TXT50_N" : data[i].TXT50_N,
                "XBILK_N" : data[i].XBILK_N,
                "GLAccount_ID" : GLAccountID
            }   
            
            // Check in DB if the Non GL Account exists
            let selectNonGLQuery = SELECT.one.from('GLMappedAccounts').where({"KTOPL_N":NonGLAccount.KTOPL_N, "SAKNR_N":NonGLAccount.SAKNR_N, "GLAccount_ID":NonGLAccount.GLAccount_ID});
            let selectNonGLResult = await srv.run(selectNonGLQuery);

            // If record found in DB, do not create a new GL Account
            if (!selectNonGLResult) {
                NonGLAccountsData.push(NonGLAccount);
            }
        }

        // Execute INSERT query for GL Account 
        if (GLAccountsData.length) {
            const insertQuery = INSERT.into('GLAccounts').entries(GLAccountsData);
            const insertResult = await srv.run(insertQuery);
        }
        
        // Execute INSERT query for Non GL Account 
        if (NonGLAccountsData.length) {
            const insertQuery2 = INSERT.into('GLMappedAccounts').entries(NonGLAccountsData);
            const insertResult2 = await srv.run(insertQuery2);
        }

        return GLAccountsData; //returns response to excel upload entity

    };

    

}