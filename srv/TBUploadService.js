const cds = require('@sap/cds');

module.exports = async function (srv) {

    this.on('test', async req => {
        return 'Spain';
    }),

    this.on('PUT', "ExcelUpload", async (req, next) => {
        console.log('Here');
    })
    
    
}