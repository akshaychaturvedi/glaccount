using { CV_DEMINIMIS_CAL_01 as DeminimisReport } from '../db/deminimismodel';

service DeminimisService {

    entity DeminimisData as projection on DeminimisReport;

}
