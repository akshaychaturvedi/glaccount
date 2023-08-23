using DeminimisService as service from '../../srv/Deminimis';

annotate service.DeminimisData with @(

Capabilities.FilterRestrictions.NonFilterableProperties: [
    INC_YEAR,
    INC_YEAR1,
    INC_YEAR2,
    INC_AVG,
    REV_YEAR,
    REV_YEAR1,
    REV_YEAR2,
    REV_AVG,
    EXCLUSION,
    KTOPL
]);

annotate service.DeminimisData with {
    LAND1 @(
        Common.FieldControl: #ReadOnly,
        Common.Label       : 'Country',
        Common.ValueList   : {
            CollectionPath: 'DeminimisData',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'LAND1',
                ValueListProperty: 'LAND1'
            }]
        }
    );
    GJAHR @(
        Common.FieldControl: #ReadOnly,
        Common.Label       : 'Fiscal Year',
        Common.ValueList   : {
            CollectionPath: 'DeminimisData',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'GJAHR',
                ValueListProperty: 'GJAHR'
            }, ]
        }
    );
}
