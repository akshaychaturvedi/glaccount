using {GLAccount.db.tables as tables} from '../db/datamodel';

annotate tables.GLAccounts with @odata.draft.enabled;

// @cds.odata.valuelist
annotate tables.ChartofAccountsVH with @(UI: {
    LineItem  : [
        {
            $Type: 'UI.DataField',
            Value: KTOPL,
        },
    ],
    Identification  : [
        {
            $Type: 'UI.DataField',
            Value: KTOPL,
        },
    ],
});

annotate tables.NonChartofAccountsVH with @(UI: {
    
    Identification  : [
        {
            $Type: 'UI.DataField',
            Value: KTOPL_N,
        },
    ],
});

@cds.odata.valuelist
annotate tables.GLAccounts with @(UI: {
    
    HeaderInfo     : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'GL Account',
        TypeNamePlural: 'GL Accounts',
        Title         : {
            Label: 'GL Account',
            Value: SAKNR
        },
        Description   : {
            Label: 'GL Account Text',
            Value: TXT50
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
            Target: 'NonGLAccounts/@UI.LineItem',
            Label : 'Mapped GL Accounts'
        },
    ],

    SelectionFields: [
        KTOPL,
        SAKNR,
        NonGLAccounts.KTOPL_N,
        XBILK
    ],

    LineItem       : [
        {
            $Type                : 'UI.DataField',
            Value                : KTOPL,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: SAKNR,
        },
        {
            $Type: 'UI.DataField',
            Value: TXT50,
        },
        {
            $Type: 'UI.DataField',
            Value: XBILK,
        },
    ],

    Identification : [
        {
            $Type: 'UI.DataField',
            Value: KTOPL,
        },
        {
            $Type: 'UI.DataField',
            Value: SAKNR,
        },
        {
            $Type: 'UI.DataField',
            Value: TXT50,
        },
        {
            $Type: 'UI.DataField',
            Value: XBILK,
        },
    ],
});

annotate tables.GLMappings with @(UI: {

    HeaderInfo            : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Non SAP GL Account',
        TypeNamePlural: 'Non SAP GL Accounts',
        Title         : {
            Label: 'GL Account',
            Value: SAKNR_N
        },
        Description   : {
            Label: 'GL Account Text',
            Value: TXT50_N
        }
    },

    Facets                : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.Identification#ItemID',
    }, ],

    LineItem              : [
        {
            $Type                : 'UI.DataField',
            Value                : KTOPL_N,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: SAKNR_N,
        },
        {
            $Type: 'UI.DataField',
            Value: TXT50_N,
        },
        {
            $Type: 'UI.DataField',
            Value: SOURCE,
        },
    ],

    Identification #ItemID: [
        {
            $Type: 'UI.DataField',
            Value: KTOPL_N,
        },
        {
            $Type: 'UI.DataField',
            Value: SAKNR_N,
        },
        {
            $Type: 'UI.DataField',
            Value: TXT50_N,
        }
    ],
});

annotate tables.GLAccounts with {
    SAKNR @(
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'GLAccounts',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'SAKNR',
                    ValueListProperty : 'SAKNR',
                    },
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'TXT50',
                    ValueListProperty : 'TXT50',
                    },
                ]
            },
        }
    );
    KTOPL @(
        readonly,
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ChartofAccountsVH',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'KTOPL',
                    ValueListProperty : 'KTOPL',
                    },
                ]
            },
        },
    );
    TXT50 @(
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'GLAccounts',
                Parameters : [
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'TXT50',
                    ValueListProperty : 'TXT50',
                    },
                ]
            },
        }
    );
    XBILK @(
        Common  :{
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'GLAccountTypesVH',
                Parameters : [{
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : XBILK,
                    ValueListProperty : 'XBILK',
                }]
            },
        }
    )
}

annotate tables.GLMappings with {
    KTOPL_N @(
        Common : {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'NonChartofAccountsVH',
                Parameters : [
                    // {
                    // $Type             : 'Common.ValueListParameterFilterOnly',
                    // ValueListProperty : 'SAKNR',
                    // },
                    {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'KTOPL_N',
                    ValueListProperty : 'KTOPL_N',
                    },
                ]
            },
        }
        
    )
};




