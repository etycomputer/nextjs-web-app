import { DB_Connection } from "../database/dbConnection";
import { ReadingEntity } from "../entities/reading.entity";

export const ReadingRepository = DB_Connection.getRepository(ReadingEntity);