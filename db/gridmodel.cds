namespace gridmodel.db;

using {
    cuid,
    Currency
} from '@sap/cds/common';

entity gridtable : cuid {

    key name             : String(20);
    key phone            : String(12);
        email            : String(50);
        address          : String(50);
        postalZip        : String(8);
        region           : String(15);
        country          : String(15);
        numberrange      : Integer;
        currency         : String(15);
        list             : Integer;
        text             : String(100);
        alphanumeric     : String(20);

}
