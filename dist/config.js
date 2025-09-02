import fs from "fs";
import os from "os";
export async function setUser(username) {
    const gCfg = await readConfig();
    gCfg.current_user_name = username;
    const homeDir = os.homedir();
    const fullPath = `${homeDir}/.gatorconfig.json`;
    fs.writeFileSync(fullPath, JSON.stringify(gCfg));
}
export async function readConfig() {
    try {
        const homeDir = os.homedir();
        const fullPath = `${homeDir}/.gatorconfig.json`;
        const data = await fs.readFileSync(fullPath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }
    catch (error) {
        console.error(`Error reading or parsing JSON file: ${error}`);
        throw error;
    }
}
export function ReadConfigSync() {
    try {
        const homeDir = os.homedir();
        const fullPath = `${homeDir}/.gatorconfig.json`;
        const data = fs.readFileSync(fullPath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }
    catch (error) {
        console.error(`Error reading or parsing JSON file: ${error}`);
        throw error;
    }
}
;
