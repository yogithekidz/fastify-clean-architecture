import { config } from 'dotenv';
config({
    path: `./.env`
})

import FastifyBaseAddon from "@application/boot/fastify/base";
// import FastifyRouteAddon from "@application/boot/fastify/route";
import FastifySwaggerAddon from "@application/boot/fastify/swagger";
import BootMySQL from "@application/boot/mysql";
import { AppConfig, InfraHttpFastify, InfraMysqlConnection } from "index";
import { ajvFilePlugin } from '@application/boot/helper';
import authRoutes from '@adapters/inbound/http/routes/auth';
import { UserEntity } from '@adapters/outbound/entities/UserEntity';

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
        DBdatabase: process.env.MYSQL_DATABASE || 'fastify_login',
        DBusername: process.env.MYSQL_USER || 'root',
        DBpassword: process.env.MYSQL_PASSWORD || '',
      });
    //end of set config section

    //MYSQL section
    // Setup MySQL DataSource
    /**
     * Setelah di masukan di ENV tinggal di get aja sesaui kebutuhan
     * baru di cek BootMySQL (kek biasa ping dan pong gitu dari server ke database)
     * kalau true bakalan boleh lanjut
     */
    await InfraMysqlConnection.CreateDataSource({
        host: AppConfig.GetConfig("DBhost"),
        port: AppConfig.GetConfig("DBport"),
        username: AppConfig.GetConfig("DBusername"),
        password: AppConfig.GetConfig("DBpassword"),
        database: AppConfig.GetConfig("DBdatabase"),
        type: "mysql",
        multipleStatements: false,
        poolSize: AppConfig.GetConfig("DBpoolSize") || 5,
        entities: [UserEntity],// kaga perlu ini
    });

    await BootMySQL({
        CheckDatabase: true,
    });

    //Fastify Section
    // Create Fastify Instance..
    const fastify = await InfraHttpFastify.CreateServer({ajv : {plugins : [ajvFilePlugin]}});
    await fastify
        .register(FastifyBaseAddon)
        .register(FastifySwaggerAddon)
        .register(authRoutes, {
            // prefix: AppConfig.GetConfig("httpPrefix") || "/api/v1"
        })
    await fastify.ready()
    await fastify.listen({
        host: AppConfig.GetConfig("httpHost") || "localhost",
        port: AppConfig.GetConfig("httpPort") || 3000
    });
    fastify.swagger()
}

Start();
