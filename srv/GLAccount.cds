using {GLAccount.db.tables as tables} from '../db/datamodel';

service GLAccountService @(path: '/service') {

    entity GLAccounts       as projection on tables.GLAccounts;
    entity GLMappedAccounts as projection on tables.GLMappings;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

    entity ChartofAccountsVH as projection on tables.ChartofAccountsVH;

    //@odata.draft.enabled : false
    //entity COAVH @(cds.redirection.target:false) as projection on tables.COAVH;

    // @cds.persistence.skip
    // @cds.odata.valuelist
    // define view chartofaccounts as
    // //entity chartofaccounts  as
    //     select from GLAccounts distinct {
    //         key KTOPL
    //     };

    // annotate chartofaccounts with @UI: {LineItem: [{
    //     $Type: 'UI.DataField',
    //     Value: KTOPL,
    // }, ], };

}
