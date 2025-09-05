import { CommandsRegistry, handlerAgg, handlerLogin, handlerRegister, handlerReset, handlerUsers, registerCommand, runCommand } from "./commands";

async function main() {
    const commands: CommandsRegistry = {};
    registerCommand(commands, "register", handlerRegister);
    registerCommand(commands, "login", handlerLogin);
    registerCommand(commands, "reset", handlerReset);
    registerCommand(commands, "users", handlerUsers);
    registerCommand(commands, "agg", handlerAgg);

    const argv = process.argv.slice(2);
    if (argv.length < 1) {
        console.error("Not enough arguments");
        process.exit(1);
    }

    const [cmdName, ...cmdArgs] = argv;

    try {
        await runCommand(commands, cmdName, ...cmdArgs);
        process.exit(0);
    } catch (err) {
        console.error("Error running command:", err);
        process.exit(1);
    }
}

main();
