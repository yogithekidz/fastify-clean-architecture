import * as InfraMySQL from "@infrastructure/mysql/connection";
import { MysqlDataSource } from "@infrastructure/mysql/connection";
import { DataSource } from "typeorm";
import * as AppConfig from "@application/config/app.config"
import { logger } from "@utils/logger/pino";
// import { UserEntity } from '@adapters/outbound/entities/UserEntity';

/**
 * MODULE AUGMENTATION TECHNIQUE...
 */
/**
 * Note
 * di interface MysqlDataSource itu ada ds seperti setter dan GetDataSource itu getternya
 * jangan terpaku sama interace nya karena dari segi penerapan pastinya berbeda bisa menyesuaikan
 */

declare module "@infrastructure/mysql/connection" {
    interface MysqlDataSource {
        ds?: DataSource;
        GetDataSource(): Promise<DataSource>;
    }
}

type BootMySQLOptions = {
    CheckDatabase: boolean;
}

MysqlDataSource.prototype.GetDataSource = async function(): Promise<DataSource>{
    if(this.ds){
        return this.ds;
    }

    if(this.dataSources.length <= 0){
        const dataSources = InfraMySQL.GetMySQLDataSource();
        if(dataSources.dataSources.length <= 0){
             throw new Error("DataSource is empty");
        }
        this.dataSources = dataSources.dataSources
    }

    for(const ds of this.dataSources){
        if(ds.options.type == "mysql" || ds.options.type == "mariadb"){
            const db_name: string = AppConfig.GetConfig("DBdatabase");
            const db_host: string = AppConfig.GetConfig("DBhost");
            if(ds.options.database == db_name && ds.options.host == db_host){
                this.ds = ds;
                return this.ds;
            }
        }
    }

    throw new Error("DataSource not found");
}

export default async function BootMySQL(options: BootMySQLOptions){
    if(options.CheckDatabase){
        const dataSources = InfraMySQL.GetMySQLDataSource();
        const db_database = await dataSources.GetDataSource();
        // test connection..
        await db_database.query(`SELECT 1`);
    }
    logger.info({ event: `application/boot/mysql`, msg: "Done..." });
}

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.MYSQL_HOST || 'localhost',
//   port: parseInt(process.env.MYSQL_PORT || '3306'),
//   username: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || '',
//   database: process.env.MYSQL_DATABASE || 'fastify_login',
//   entities: [UserEntity],
//   synchronize: false,
// });

// export const createMysqlConnection = async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//     console.log('✅ Database connected');
//   }
// };
