import fs from "fs";
import os from "os";

export type GatorConfig = {
    db_url: string,
    current_user_name: string,
};

export async function setUser(username: string) {
    const gCfg = await readConfig()
    gCfg.current_user_name = username
    const homeDir = os.homedir()
    const fullPath = `${homeDir}/.gatorconfig.json`
    fs.writeFileSync(fullPath, JSON.stringify(gCfg))
};


export function readConfig(): GatorConfig {
    try {
        const homeDir = os.homedir()
        const fullPath = `${homeDir}/.gatorconfig.json`
        const data = fs.readFileSync(fullPath, 'utf8');
        const jsonData: GatorConfig = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error(`Error reading or parsing JSON file: ${error}`);
        throw error;
    }
};
