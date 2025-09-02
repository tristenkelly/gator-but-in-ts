import { db } from "../connection";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function getUser(name: string) {
    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result ?? null;
};

export async function createUser(name: string) {
    const [user] =  await db.insert(users).values({ name }).returning();
    return user;
};

export async function resetUsers() {
  await db.delete(users).returning();
}
