import { setUser } from "./config";
import { getUser, createUser, resetUsers } from "./lib/db/queries/users";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export const commands: CommandsRegistry = {};

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length < 1) {
        throw new Error("must provide a username to log in");
    }
    if (args.length > 1) {
        throw new Error("only one argument needed for login");
    }
    const username = args[0];
    const existingUser = await getUser(username);
    if (!existingUser) {
        throw new Error("user not found");
    }
    setUser(username);
    console.log(`user has been set to: ${username}`);
}

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    try {
    registry[cmdName] = handler;
    } catch (error) {
        throw new Error("command not found")
    }
}

export async function runCommand(reg: CommandsRegistry, name: string, ...args: string[]) {
  const handler = reg[name];
  if (!handler) throw new Error(`unknown command: ${name}`);
  await handler(name, ...args);
}


export async function handlerRegister(cmdName: string, ...args: string[]) {
    const username = args[0];
    if (!username) throw new Error("No username provided");

    console.log(`Username: ${username}`);
    try { 
        console.log("Checking if user exists...");
        const existingUser = await getUser(username);

        if (existingUser && existingUser.id) {
            console.log("user already exists");
            process.exit(1);
        }

        console.log("Creating new user...");
        const newUser = await createUser(username);

        await setUser(username);

        console.log(`User created: ${username}`);
        console.log(`${newUser.id}`);
        console.log(`${newUser.name}`);
        console.log(`${newUser.createdAt}`);
        console.log(`${newUser.updatedAt}`);
    } catch (err) {
        console.log("Error running register");
    }
};


export async function handlerReset() {
    try {
        await resetUsers();
        console.log("All users deleted.");
    } catch (error) {
        console.error("Error resetting users:", error);
    }
};



