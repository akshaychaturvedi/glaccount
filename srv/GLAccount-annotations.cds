using {GLAccount.db.tables as tables} from '../db/datamodel';

annotate tables.GLAccounts with @odata.draft.enabled;

annotate tables.ChartofAccountsVH with @(UI: {
    LineItem  : [
        {
            $Type: 'UI.DataField',
            Value: chartOfAccounts,
        },
    ],
    Identification  : [
        {
            $Type: 'UI.DataField',
            Value: chartOfAccounts,
        },
    ],
});

annotate tables.SourceChartofAccountsVH with @(UI: {
    
    Identification  : [
        {
            $Type: 'UI.DataField',
            Value: sourceChartOfAccounts,
        },
    ],
});

@cds.odata.valuelist
annotate tables.GLAccounts with @(UI: {

    PresentationVariant  : {
        $Type : 'UI.PresentationVariantType',        
        Visualizations : [
            '@UI.LineItem',
        ],
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : glaccount, 
            },
            {
                $Type : 'Common.SortOrderType',
                Property : chartOfAccounts,
            }
        ],
    },

    HeaderInfo     : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'GL Account',
        TypeNamePlural: 'GL Accounts',
        Title         : {
            Label: 'GL Account',
            Value: glaccount
        },
        Description   : {
            Label: 'GL Account Text',
            Value: descr
        }
    },

    Facets         : [
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.Identification',
            Label : 'GL Accounts',
            ID    : 'GenInfo'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target: 'sourceAccounts/@UI.LineItem',
            Label : 'Mapped GL Accounts'
        },
    ],

    SelectionFields: [
        chartOfAccounts,
        glaccount,
        sourceAccounts.sourceChartOfAccounts,
        accountType
    ],

    LineItem       : {
        ![@UI.Criticality] : 1,    
        $value: [
            {
                $Type                : 'UI.DataField',
                Value                : chartOfAccounts,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20rem',
                },
            },
            {
                $Type: 'UI.DataField',
                Value: glaccount,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20rem',
                },
            },
            {
                $Type: 'UI.DataField',
                Value: descr,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20rem',
                },
            },
            {
                $Type: 'UI.DataField',
                Value: accountType,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20rem',
                },
            },
        ]
    },

    Identification : [
        {
            $Type: 'UI.DataField',
            Value: chartOfAccounts,
        },
        {
            $Type: 'UI.DataField',
            Value: glaccount,
        },
        {
            $Type: 'UI.DataField',
            Value: descr,
        },
        {
            $Type: 'UI.DataField',
            Value: accountType,
        },
    ],
});

annotate tables.SourceGLAccounts with @(UI: {

    HeaderInfo            : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Non SAP GL Account',
        TypeNamePlural: 'Non SAP GL Accounts',
        Title         : {
            Label: 'GL Account',
            Value: sourceGLAccount
        },
        Description   : {
            Label: 'GL Account Text',
            Value: sourceDescr
        }
    },

    Facets                : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.Identification#ItemID',
    }, ],

    LineItem              : [
        {
            $Type                : 'UI.DataField',
            Value                : sourceChartOfAccounts,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: sourceGLAccount,
        },
        {
            $Type: 'UI.DataField',
            Value: sourceDescr,
        },
        {
            $Type: 'UI.DataField',
            Value: source,
        },
    ],

    Identification #ItemID: [
        {
            $Type: 'UI.DataField',
            Value: sourceChartOfAccounts,
        },
        {
            $Type: 'UI.DataField',
            Value: sourceGLAccount,
        },
        {
            $Type: 'UI.DataField',
            Value: sourceDescr,
        }
    ],
});

annotate tables.GLAccounts with {
    glaccount @(
        mandatory,
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'GLAccounts',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'glaccount',
                    ValueListProperty : 'glaccount',
                    },
                    {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                    },
                ]
            },
        }
    );
    chartOfAccounts @(
        readonly,
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ChartofAccountsVH',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'chartOfAccounts',
                    ValueListProperty : 'chartOfAccounts',
                    },
                ]
            },
        },
    );
    accountType @(
        Common  :{
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'GLAccountTypesVH',
                Parameters : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'accountType',
                    ValueListProperty : 'accountType',
                }]
            },
        }
    )
}

annotate tables.SourceGLAccounts with {
    sourceChartOfAccounts @(
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SourceChartofAccountsVH',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'sourceChartOfAccounts',
                    ValueListProperty : 'sourceChartOfAccounts',
                    },
                ]
            },
        }
        
    )
};




