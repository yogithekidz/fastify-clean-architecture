// // import { MysqlDataSource } from "@infrastructure/mysql/connection";
// import { MMBWhitelabelList, WhitelabelManagerConfig } from "@domain/model/Whitelabel";
// const dataSource = new MysqlDataSource();

// export async function DBGetWhiteLabel(): Promise<MMBWhitelabelList[]> {
//     const db = await dataSource.GetMMBDataSource();
//     const data = await db.query<MMBWhitelabelList[]>(`SELECT a.id, a.company, a.endpoint_url, a.additional_header, a.main_url, a.ims_url from mmb_whitelabel a`);
//     return data;
// }

// export async function DBGetManagerConfig(): Promise<WhitelabelManagerConfig[]> {
//     const db = await dataSource.GetMMBDataSource();
//     const results = await db.query<WhitelabelManagerConfig[]>(`SELECT a.id, a.name, a.description, a.secret_key, a.private_jwt_key, public_jwt_key, GROUP_CONCAT(b.company_id) AS company_ids
//     FROM mmb_whitelabel_manager a
//     INNER JOIN mmb_whitelabel_manager_access b
//     ON a.id = b.manager_id
//     GROUP BY a.id`)

//     return results
// }
