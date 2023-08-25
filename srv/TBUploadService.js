const cds = require('@sap/cds');

module.exports = async function (srv) {

    this.on('test', async req => {
        return 'Spain';
    }),

    this.on('PUT', "ExcelUpload", async (req, next) => {
        console.log('Here');
    }),

    this.on("UploadData", async (req) => { 
        
        var extract = JSON.parse(req.data.data);
        var extractedData = [];

        // Loop through the array and extract fields
        extract.forEach(item => {
            extractedData.push({
                companyCode: item.CompanyCode,
                chartOfAccounts: item.ChartofAccounts,
                year: item.Year,
                period: item.Period,
                glAccount: item.GLAccount,
                alc: item.AmountLC,
                agc:item.AmountGC,
                lc: item.LocalCurrency,
                gc: item.GlobalCurrency,
                costCenter: item.CostCenter,
                profitCenter: item.ProfitCenter,
                businessArea: item.BusinessArea,
                functionalArea: item.FunctionalArea,
                source: item.Source
                
            });
        });
        
        const { TrialBalance } = cds.entities;

        let srv = await cds.connect.to('TBUploadService');

        const insertQuery = INSERT.into('TrialBalance').entries(extractedData);
        const insertResult = await srv.run(insertQuery);

        return insertResult;
    });
    
    
}