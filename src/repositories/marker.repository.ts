import { DB_Connection } from "../database/dbConnection";
import { MarkerEntity } from "../entities/marker.entity";

export const MarkerRepository = DB_Connection.getRepository(MarkerEntity);