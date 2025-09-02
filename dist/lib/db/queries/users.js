import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
export async function getUser(name) {
    console.log(`Looking for user: ${name}`);
    console.log("Executing query...");
    try {
        const result = await db.select().from(users).where(eq(users.name, name));
        console.log("Query completed, result:", result);
        return result[0];
    }
    catch (error) {
        console.log("Query error:", error);
        throw error;
    }
}
export async function createUser(name) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}
