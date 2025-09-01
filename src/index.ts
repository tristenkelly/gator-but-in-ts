import { commands, CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commands";
import { readConfig, setUser } from "./config";

async function main() {
    const cfg = await readConfig()
    const commands: CommandsRegistry = {
    }
    registerCommand(commands, "login", handlerLogin)
    const argv = process.argv.slice(2);
    if (argv.length < 1) {
    console.error("not enough arguments");
    process.exit(1);
    }
    const [cmdName, ...cmdArgs] = argv;
    runCommand(commands, cmdName, ...cmdArgs);
}

main();