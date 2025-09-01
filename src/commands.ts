import { setUser } from "./config";


export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export const commands: CommandsRegistry = {};

export function handlerLogin(cmdName: string, ...args: string[]) {
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

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    try {
    registry[cmdName] = handler;
    } catch (error) {
        throw new Error("command not found")
    }
}

export function runCommand(reg: CommandsRegistry, name: string, ...args: string[]) {
  const handler = reg[name];
  if (!handler) throw new Error(`unknown command: ${name}`);
  handler(name, ...args);
}