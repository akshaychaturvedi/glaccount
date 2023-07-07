namespace GLAccount.db;

using {cuid} from '@sap/cds/common';

context tables {

    entity GLAccounts : cuid {
        KTOPL         : String(4)  @default: 'TPRS'  @title: 'Chart of Accounts';
        SAKNR         : String(10) @title  : 'GL Account';
        TXT50         : String(50) @title  : 'Description';
        XBILK         : String(40) @title  : 'GL Account Type';
        NonGLAccounts : Composition of many GLMappings
                            on NonGLAccounts.GLAccount = $self;
    }

    entity GLMappings : cuid {
        KTOPL_N   : String(4)  @title: 'Non-SAP Chart of Accounts';
        SAKNR_N   : String(10) @title: 'Non-SAP GL Account';
        TXT50_N   : String(50) @title: 'Non-SAP GL Account Description';
        SOURCE    : String(20) @title: 'Source';
        GLAccount : Association to GLAccounts;
    }

    view ChartofAccountsView as select distinct KTOPL from GLAccounts;
    @readonly
    @cds.odata.valuelist
    entity ChartofAccountsVH  {
            key KTOPL : tables.GLAccounts:KTOPL;
        };


}
