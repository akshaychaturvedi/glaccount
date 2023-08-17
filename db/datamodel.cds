namespace GLAccount.db;

using {cuid} from '@sap/cds/common';

context tables {

    entity GLAccounts : cuid {
        chartOfAccounts : String(4)  @default: 'BEPS'  @title: 'Chart of Accounts';
        glaccount       : String(10) @title  : 'GL Account';
        descr           : String(50) @title  : 'Description';
        accountType     : String(40) @title  : 'GL Account Type';
        sourceAccounts  : Composition of many SourceGLAccounts
                              on sourceAccounts.glaccount = $self;
    }

    entity SourceGLAccounts : cuid {
        sourceChartOfAccounts : String(4)  @title: 'Source Chart of Accounts';
        sourceGLAccount       : String(10) @title: 'Source GL Account';
        sourceDescr           : String(50) @title: 'Source GL Account Description';
        source                : String(20) @title: 'Source';
        glaccount             : Association to GLAccounts;
    }

    view ChartofAccountsView as select distinct chartOfAccounts from GLAccounts;

    @readonly
    @cds.odata.valuelist
    entity ChartofAccountsVH {
        key chartOfAccounts : tables.GLAccounts:chartOfAccounts;
    };

    view SourceChartofAccountsView as
        select distinct
        sourceAccounts.sourceChartOfAccounts from GLAccounts;

    entity GLAccountTypesVH : cuid {
        accountType : tables.GLAccounts:accountType;
    }

    @readonly
    @cds.odata.valuelist
    entity SourceChartofAccountsVH {
        key chartOfAccounts   : tables.GLAccounts:chartOfAccounts;
        key glaccount   : tables.GLAccounts:glaccount;
            sourceChartOfAccounts : tables.SourceGLAccounts:sourceChartOfAccounts;
    };

    view GLAccountData as
        select from GLAccounts {
            *,
            sourceAccounts.sourceChartOfAccounts,
            sourceAccounts.sourceGLAccount,            
            sourceAccounts.sourceDescr,
            sourceAccounts.source
        };

}


context tbuploadtables {
    entity TrialBalance : cuid {
        chartOfAccounts : String(4)  @title: 'Chart of Accounts';
        glaccount       : String(10) @title  : 'GL Account';
    }
}