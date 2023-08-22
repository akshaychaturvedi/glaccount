using { CV_DEMINIMIS_CAL_01 as DeminimisReport } from '../db/deminimismodel';

service DeminimisService {
    
    entity DeminimisData as projection on DeminimisReport{
        *,
        case EXCLUSION
            when true then 'Yes'
            when false then 'No'
            end as ExclusionValue : String 
    };
    action test() returns String;

}
