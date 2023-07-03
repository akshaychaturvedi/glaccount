using { GLAccount.db.tables as tables} from '../db/datamodel';
using { GLAccount.db.cdsviews as cdsviews } from '../db/cdsviews';

service GLAccountService @(path: '/service') {

    entity GLAccounts  as projection on tables.GLAccounts;
    entity GLMappedAccounts as projection on tables.GLMappings;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

}
