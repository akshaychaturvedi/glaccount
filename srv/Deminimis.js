const cds = require('@sap/cds');

module.exports = async function (srv) {

    this.on('test', async req => {
        return 'Spain';
    })
    
    
}