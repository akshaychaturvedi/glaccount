using { eligibity.CV_BEPSELIGIBILITY02 as EligibilityReport } from '../db/eligibilitymodel';

service EligibilityService {
    
   entity EligibilityData as projection on EligibilityReport;

}
