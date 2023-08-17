entity CV_DEMINIMIS_CAL_01{
    key![REV_YEAR2] : Decimal(23, 2) @title: 'GLoBE Revenue Year 2';
    key![REV_YEAR]  : Decimal(23, 2) @title: 'GLoBE Revenue Year ';
    key![INC_YEAR1] : Decimal(23, 2) @title: 'GLoBE Income/Loss Year 1';
    key![REV_YEAR1] : Decimal(23, 2) @title: 'GLoBE Revenue Year 1';
    key![KTOPL]     : String(4)      @title: 'Chart of Accounts';
    key![LAND1]     : String(3)      @title: 'Country';
    key![GJAHR]     : String(4)      @title: 'Fiscal Year';
    key![REV_AVG]   : Decimal(23, 2) @title: 'GLoBE Revenue Average';
    key![EXCLUSION] : Boolean        @title: 'DeMinimis Exclusion';
    key![INC_AVG]   : Decimal(23, 2) @title: 'GLoBE Income/Loss Average';
    key![INC_YEAR2] : Decimal(23, 2) @title: 'GLoBE Income/Loss Year 2';
    key![INC_YEAR]  : Decimal(23, 2) @title: 'GLoBE Income/Loss Year';
}