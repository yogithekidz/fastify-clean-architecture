// export { MysqlDataSource, GetMySQLDataSource, CreateDataSource, AddDataSource } from "bpts/database/mysql" -> Ini Library dari TF
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class MysqlDataSource {
  protected dataSources: DataSource[] = [];

  /**
   * Tambah data source ke daftar
   */
  async addDataSource(dataSource: DataSource): Promise<DataSource> {
    this.dataSources.push(dataSource);
    return dataSource;
  }

  /**
   * Buat data source baru dan langsung tambah
   */
  async createDataSource(options: MysqlConnectionOptions): Promise<DataSource> {
    const dataSource = new DataSource(options);
    await dataSource.initialize();
    this.dataSources.push(dataSource);
    return dataSource;
  }

  /**
   * Getter: ambil semua data source
   */
  getAll(): DataSource[] {
    return this.dataSources;
  }
}

// Singleton: hanya satu instance MysqlDataSource
const mysqlDataSource = new MysqlDataSource();

// Export fungsi helper dan instance
 async function AddDataSource(dataSource: DataSource): Promise<DataSource> {
  return mysqlDataSource.addDataSource(dataSource);
}

 async function CreateDataSource(options: MysqlConnectionOptions): Promise<DataSource> {
  return mysqlDataSource.createDataSource(options);
}

 function GetMySQLDataSource(): MysqlDataSource {
  return mysqlDataSource;
}

// Opsional: juga bisa export class (kalau nanti mau buat instance lain)
export { GetMySQLDataSource, CreateDataSource, AddDataSource }
