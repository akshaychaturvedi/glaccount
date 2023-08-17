using {gridmodel.db.gridtable} from '../db/gridmodel';

service GridService {

   entity GridTable as projection on gridtable;
   action test() returns String;

}
