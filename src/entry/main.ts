import { config } from 'dotenv';
config({
    path: `./.env`
})

import FastifyBaseAddon from "@application/boot/fastify/base";
import FastifyRouteAddon from "@application/boot/fastify/route";
import FastifySwaggerAddon from "@application/boot/fastify/swagger";
// import BootMySQL from "@application/boot/mysql";
import { AppConfig, InfraHttpFastify } from "index";
import { ajvFilePlugin } from '@application/boot/helper';

async function Start(){
    //set config section
    AppConfig.SetConfig({
        production: process.env.PRODUCTION === 'true',
        httpHost: process.env.HTTP_HOST || 'localhost',
        httpPort: parseInt(process.env.HTTP_PORT || '3000'),
        httpPrefix: process.env.HTTP_PREFIX || '/api/v1',
        Database: process.env.MYSQL_DATABASE === 'true',
        DBhost: process.env.MYSQL_HOST || '127.0.0.1',
        DBport: parseInt(process.env.MYSQL_PORT || '3306'),
        DBpoolSize: parseInt(process.env.DB_POOL_SIZE || '5'),
        DBdatabase: process.env.MYSQL_DATABASE || 'dev',
        DBusername: process.env.MYSQL_USER || 'root',
        DBpassword: process.env.MYSQL_PASSWORD || '',
      });
    //end of set config section

    //MYSQL section
    // Setup MySQL DataSource
    // await InfraMysqlConnection.CreateDataSource({
    //     host: AppConfig.GetConfig("DBhost") || "127.0.0.1",
    //     port: AppConfig.GetConfig("DBport") || 3306,
    //     username: AppConfig.GetConfig("DBusername") || "127.0.0.1",
    //     password: AppConfig.GetConfig("DBpassword") || "",
    //     database: AppConfig.GetConfig("DBdatabase") || "127.0.0.1",
    //     type: "mysql",
    //     multipleStatements: false,
    //     poolSize: AppConfig.GetConfig("DBpoolSize") || 5
    // });

    // await BootMySQL({
    //     CheckMMBDatabase: true,
    // });

    //Fastify Section
    // Create Fastify Instance..
    const fastify = await InfraHttpFastify.CreateServer({ajv : {plugins : [ajvFilePlugin]}});
    await fastify
        .register(FastifyBaseAddon)
        .register(FastifySwaggerAddon)
        .register(FastifyRouteAddon, {
            // prefix: AppConfig.GetConfig("httpPrefix") || "/"
        })
    await fastify.ready()
    await fastify.listen({
        host: AppConfig.GetConfig("httpHost") || "localhost",
        port: AppConfig.GetConfig("httpPort") || 3000
    });
    fastify.swagger();
}

Start();
