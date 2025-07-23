import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { logger } from '../../utils/logger/pino';
import AsyncLock from 'async-lock';

const lock = new AsyncLock();
let initialized = false;
let server: FastifyInstance;

export async function isReady(): Promise<boolean>{
    return lock.acquire<boolean>('fastify_setup', async ()=>{
        if(!initialized){
            throw new Error("Webserver is not ready yet...")
        }

        return initialized;
    });
}

export async function SetServer(fastifyInstance: FastifyInstance): Promise<FastifyInstance>{
    return lock.acquire<FastifyInstance>('fastify_setup', async ()=>{
        if(initialized){
            return fastify;
        }
    
        server = fastifyInstance;
        initialized = true;

        logger.info({ event: `infrastructure/http/server`, msg: "Initialized..." });
        return server;
    });
}

export async function CreateServer(options: FastifyServerOptions): Promise<FastifyInstance>{
    return lock.acquire<FastifyInstance>('fastify_setup', async ()=>{
        if(initialized){
            return server;
        }
    
        server = fastify(options);
        initialized = true;

        logger.info({ event: `infrastructure/http/server`, msg: "Initialized..." });
        return server;
    });
}

export function GetFastifyInstance(): FastifyInstance{
    if(!initialized){
        throw new Error("Webserver is not ready yet...")
    }
    return server;
}