import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();
const conn = postgres(config.db_url);
export const db = drizzle(conn, { 
  schema,
  logger: true,
 });