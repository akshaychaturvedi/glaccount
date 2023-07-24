using {GLAccount.db.tables as tables} from '../db/datamodel';
using { GLAccount.db.cdsviews } from '../db/cdsviews';


service GLAccountService @(path: '/service') {

    entity GLAccounts       as projection on tables.GLAccounts;
    entity SourceGLAccounts as projection on tables.SourceGLAccounts;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

    function downloadExcel() returns String;

    entity ChartofAccountsVH as projection on tables.ChartofAccountsVH;

    entity SourceChartofAccountsVH as projection on tables.SourceChartofAccountsVH;

    entity GLAccountTypesVH as projection on tables.GLAccountTypesVH;

}
