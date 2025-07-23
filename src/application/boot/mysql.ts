import * as InfraMySQL from "@infrastructure/mysql/connection";
import { MysqlDataSource } from "@infrastructure/mysql/connection";
import { DataSource } from "typeorm";
import * as AppConfig from "@application/config/app.config"
import { logger } from "@utils/logger/pino";
/**
 * MODULE AUGMENTATION TECHNIQUE...
 */
declare module "@infrastructure/mysql/connection" {
    interface MysqlDataSource {
        ds?: DataSource;
        GetMMBDataSource(): Promise<DataSource>;
    }
}

type BootMySQLOptions = {
    CheckMMBDatabase: boolean;
}

MysqlDataSource.prototype.GetMMBDataSource = async function(): Promise<DataSource>{
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
    if(options.CheckMMBDatabase){
        const dataSources = InfraMySQL.GetMySQLDataSource();
        const mmb_db = await dataSources.GetMMBDataSource();
        // test connection..
        await mmb_db.query(`SELECT a.user_id FROM users a LIMIT 1`);
    }
    logger.info({ event: `application/boot/mysql`, msg: "Done..." });
}
