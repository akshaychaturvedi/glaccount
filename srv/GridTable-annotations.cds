using {gridmodel.db.gridtable} from '../db/gridmodel';

annotate gridtable with @(UI: {
    
    SelectionFields: [
        name,
        region,
        country
    ],

    LineItem       : [
        {
            $Type            : 'UI.DataField',
            Value            : name,
            ![@UI.Importance]: #High,
            Label            : 'Name'
        },
        {
            $Type            : 'UI.DataField',
            Value            : phone,
            Label            : 'Phone Number',
            ![@UI.Importance]: #Medium
        },
        {
            $Type            : 'UI.DataField',
            Value            : email,
            Label            : 'Email Address',
            ![@UI.Importance]: #Medium
        },
        {
            $Type            : 'UI.DataField',
            Value            : address,
            Label            : 'Address',
            ![@UI.Importance]: #Medium
        },
        {
            $Type            : 'UI.DataField',
            Value            : postalZip,
            Label            : 'Postal/Zip Code',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : region,
            Label            : 'Region',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : country,
            Label            : 'Country',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : numberrange,
            Label            : 'Number Range',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : currency,
            Label            : 'Currency',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : list,
            Label            : 'List',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : text,
            Label            : 'Text',
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : alphanumeric,
            Label            : 'Alphanumeric',
            ![@UI.Importance]: #High
        }

    ]


});

annotate gridtable with {
    country @(Common.FilterDefaultValue: 'Spain')
};
