import { setUser } from "./config";
import { getUser, createUser } from "./lib/db/queries/users";
export const commands = {};
export async function handlerLogin(cmdName, ...args) {
    if (args.length < 1) {
        throw new Error("must provide a username to log in");
    }
    if (args.length > 1) {
        throw new Error("only one argument needed for login");
    }
    const username = args[0];
    setUser(username);
    console.log(`user has been set to: ${username}`);
}
export async function registerCommand(registry, cmdName, handler) {
    try {
        registry[cmdName] = handler;
    }
    catch (error) {
        throw new Error("command not found");
    }
}
export async function runCommand(reg, name, ...args) {
    const handler = reg[name];
    if (!handler)
        throw new Error(`unknown command: ${name}`);
    handler(name, ...args);
}
export async function handlerRegister(cmdName, ...args) {
    console.log("starting register...");
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0];
    console.log(`Username: ${username}`);
    console.log("Checking if user exists...");
    const existingUser = await getUser(username);
    if (existingUser) {
        throw new Error("User already exists");
    }
    console.log("Creating new user...");
    const newUser = await createUser(username);
    setUser(username);
    console.log(`User created: ${username}`);
    console.log(`${newUser.id}`);
    console.log(`${newUser.name}`);
    console.log(`${newUser.createdAt}`);
    console.log(`${newUser.updatedAt}`);
}
