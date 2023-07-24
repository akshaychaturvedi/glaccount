namespace GLAccount.db;

using {GLAccount.db.tables} from './datamodel';

context cdsviews {

    // define view![GLAccounts] as
    //     select from tables.GLAccounts {
    //         SAKNR as GLAccount
    //     };

    // define view![GLAccountTypes] as
    //     select from tables.GLAccounts {
    //         XBILK as GLAccountType
    //     };

    // define view![GLAccountData] as
    //     select from tables.GLAccounts as GLAccount
    //     {
    //         SAKNR,
    //         XBILK,
    //         NonGLAccounts.KTOPL_N,
    //         NonGLAccounts.SAKNR_N
    //     }

}
