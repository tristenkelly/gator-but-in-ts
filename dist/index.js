import { handlerLogin, handlerRegister, registerCommand, runCommand } from "./commands";
async function main() {
    const commands = {};
    registerCommand(commands, "login", handlerLogin);
    registerCommand(commands, "register", handlerRegister);
    const argv = process.argv.slice(2);
    if (argv.length < 1) {
        console.error("not enough arguments");
        process.exit(1);
    }
    const [cmdName, ...cmdArgs] = argv;
    try {
        await runCommand(commands, cmdName, ...cmdArgs);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${cmdName}: ${err.message}`);
        }
        else {
            console.error(`Error running command ${cmdName}: ${err}`);
        }
        process.exit(1);
    }
    process.exit(0);
}
main();
