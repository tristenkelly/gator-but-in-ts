import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ReadConfigSync } from "../../config";
const config = ReadConfigSync();
const conn = postgres(config.db_url, { max: 1 }); // single connection
export const db = drizzle(conn);
