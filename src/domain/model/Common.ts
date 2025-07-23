import { MMBManager } from 'mmb-shared/manager';

export type BasePaginationRequest = {
  limit: number;
  sort: string;
  lastId: number;
  search: string;
}

export type BasePaginationApp = BasePaginationRequest & {
  user_id: number;
  manager_api: MMBManager;
  ip?: string
  browser?: string
}

export type BasePaginationRepository = {
  whereClause: string;
  query_company: string | undefined;
  limit: number;
  sort: string;
};

export type AffiliatePaginationLog = BasePaginationRepository & {
  user_id:number;
  manager_api: MMBManager;
}

export type AffiliatePaginationLogQueryParams = BasePaginationRepository & {
  user_id:number;
}


type objectResult = {
  [key: string]: any
}

type BaseData = Array<number | string | undefined | boolean | objectResult> | any[]

export type BasePaginationResponses = {
  data: BaseData
  column: string[];
  hasNext: number;
}

export type BasePaginationResponses2 = {
  data: BaseData
  column: string[];
  hasNext1: number;
  hasNext2 : number;
}

export type UserTransactionsHistoryRequest = {
  user_id: number,
  manager_api: MMBManager
}

export type BaseAppPlatformList = {
  user_id:number,
  manager_api: MMBManager
}

export type BasePlatformListRepository = {
  user_id: number
  query_company: string
}

export type BaseUserPlatformListRequest = {
  user_id: number
}

export type BasePaginationRequest2LastId = {
  limit: number;
  sort: string;
  lastId1: number;
  lastId2: number;
  search: string;
}

export type BasePaginationApp2LastId = BasePaginationRequest2LastId & {
  user_id: number;
  manager_api: MMBManager;
  ip?:string
}

export type BaseAffiliateRepository = {
  whereClause: string;
  user_name: string;
  country_id:number;
  limit: number;
  sort: string;
  lastId: number;
  search: string;
}