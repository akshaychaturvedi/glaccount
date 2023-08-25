using {GLAccount.db.tbuploadtables} from '../db/datamodel';


service TBUploadService @(path: '/tbservice'){


    entity TrialBalance as projection on tbuploadtables.TrialBalance;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

    action UploadData(data: String) returns String;

}
