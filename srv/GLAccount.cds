using { GLAccount.db.tables as tables} from '../db/datamodel';
using { GLAccount.db.cdsviews as cdsviews } from '../db/cdsviews';

service GLAccountService @(path: '/service') {

    // @cds.redirection.target
    entity GLAccounts  as projection on tables.GLAccounts;
    entity GLMappedAccounts as projection on tables.GLMappings;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

    // entity GLAccounts as projection on tables.GLAccounts{
    //     *,
    //     NonGLAccounts: redirected to GLMappedAccounts
    // };

    // entity GLMappedAccounts as projection on tables.GLMappings{
    //     *,
    //     GLAccount: redirected to GLAccounts
    // };

    // entity GLAccountsVH as projection on cdsviews.GLAccounts;
    // entity GLAccountsTypesVH as projection on cdsviews.GLAccountTypes;
}
