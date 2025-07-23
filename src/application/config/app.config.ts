import { logger } from '../../utils/logger/pino';
import AsyncLock from 'async-lock';
import { ApplicationConfig } from './app.config.dto';
const lock = new AsyncLock();
let initialized = false;
let config: ApplicationConfig = {};

export async function isReady(): Promise<boolean>{
    return lock.acquire<boolean>('application_config', async ()=>{
        if(!initialized){
            throw new Error("Application Config is not ready yet...")
        }

        return initialized;
    });
}

export async function SetConfig(cfg: ApplicationConfig): Promise<ApplicationConfig>{
    return lock.acquire<ApplicationConfig>('application_config', async ()=>{
        if(initialized){
            return config;
        }

        config = {...cfg};
        initialized = true;

        logger.info({ event: `application/config/index`, msg: "Initialized..." });
        return config;
    });
}

export async function GetConfigs(): Promise<ApplicationConfig>{
    await isReady();
    return config;
}

export function GetConfig<T>(key: keyof ApplicationConfig): T{
    if(config[key] === undefined || !(key in config)){
        throw new Error("Invalid Application Config...")
    }

    return config[key];
}
