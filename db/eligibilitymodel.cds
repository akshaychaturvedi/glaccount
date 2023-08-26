context eligibity {
    entity CV_BEPSELIGIBILITY02 {
        key![THRESHOLD_YEAR]     : String(4)      @title: 'Assesment Year';
        key![UPE]                : String(4)      @title: 'Ultimate Parent Entity';
        key![LAND1]              : String(3)      @title: 'Country';
        key![BUTXT]              : String(25)     @title: 'Description';
        key![KTOPL]              : String(4)      @title: 'Chart Of Accounts';
        key![CC_CURRENT_YEAR]    : Decimal(23, 2) @title: 'Assessment in EUR';
        key![CC_YEAR_1]          : Decimal(23, 2) @title: 'Year -1 in EUR';
        key![CC_YEAR_2]          : Decimal(23, 2) @title: 'Year -2 in EUR';
        key![CC_YEAR_3]          : Decimal(23, 2) @title: 'Year -3 in EUR';
        key![CC_BEPS_ELIGIBLE]   : String(3)      @title: 'BEPS Eligibility';
        key![THRESHOLD_CURRENCY] : String(3)      @title: 'Currency';
    }
}
