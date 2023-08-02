/** Types generated for queries found in "src/engines/database/sql/stores.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateStore' parameters type */
export interface ICreateStoreParams {
  createdAt?: Date | string | null | void;
  deletedAt?: Date | string | null | void;
  id?: string | null | void;
  name?: string | null | void;
  owner?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreateStore' return type */
export type ICreateStoreResult = void;

/** 'CreateStore' query type */
export interface ICreateStoreQuery {
  params: ICreateStoreParams;
  result: ICreateStoreResult;
}

const createStoreIR: any = {"usedParamSet":{"id":true,"name":true,"owner":true,"createdAt":true,"updatedAt":true,"deletedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":163,"b":165}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":176,"b":180}]},{"name":"owner","required":false,"transform":{"type":"scalar"},"locs":[{"a":191,"b":196}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":207,"b":216}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":227,"b":236}]},{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":247,"b":256}]}],"statement":"INSERT INTO\n    \"stores\" (\n        \"id\",\n        \"name\",\n        \"owner\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    (\n        :id,\n        :name,\n        :owner,\n        :createdAt,\n        :updatedAt,\n        :deletedAt\n    )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "stores" (
 *         "id",
 *         "name",
 *         "owner",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     (
 *         :id,
 *         :name,
 *         :owner,
 *         :createdAt,
 *         :updatedAt,
 *         :deletedAt
 *     )
 * ```
 */
export const createStore = new PreparedQuery<ICreateStoreParams,ICreateStoreResult>(createStoreIR);


/** 'AddUserToStore' parameters type */
export interface IAddUserToStoreParams {
  storeId?: string | null | void;
  userId?: string | null | void;
}

/** 'AddUserToStore' return type */
export type IAddUserToStoreResult = void;

/** 'AddUserToStore' query type */
export interface IAddUserToStoreQuery {
  params: IAddUserToStoreParams;
  result: IAddUserToStoreResult;
}

const addUserToStoreIR: any = {"usedParamSet":{"storeId":true,"userId":true},"params":[{"name":"storeId","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":70}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":79}]}],"statement":"INSERT INTO\n    \"user_store\" (\"storeId\", \"userId\")\nVALUES\n    (:storeId, :userId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "user_store" ("storeId", "userId")
 * VALUES
 *     (:storeId, :userId)
 * ```
 */
export const addUserToStore = new PreparedQuery<IAddUserToStoreParams,IAddUserToStoreResult>(addUserToStoreIR);


/** 'CreateStoreProfile' parameters type */
export interface ICreateStoreProfileParams {
  addressId?: string | null | void;
  logo?: string | null | void;
  storeId?: string | null | void;
}

/** 'CreateStoreProfile' return type */
export type ICreateStoreProfileResult = void;

/** 'CreateStoreProfile' query type */
export interface ICreateStoreProfileQuery {
  params: ICreateStoreProfileParams;
  result: ICreateStoreProfileResult;
}

const createStoreProfileIR: any = {"usedParamSet":{"storeId":true,"addressId":true,"logo":true},"params":[{"name":"storeId","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":84}]},{"name":"addressId","required":false,"transform":{"type":"scalar"},"locs":[{"a":87,"b":96}]},{"name":"logo","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":103}]}],"statement":"INSERT INTO\n    \"store_profile\" (\"storeId\", \"addressId\", \"logo\")\nVALUES\n    (:storeId, :addressId, :logo)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "store_profile" ("storeId", "addressId", "logo")
 * VALUES
 *     (:storeId, :addressId, :logo)
 * ```
 */
export const createStoreProfile = new PreparedQuery<ICreateStoreProfileParams,ICreateStoreProfileResult>(createStoreProfileIR);


/** 'FindStoreById' parameters type */
export interface IFindStoreByIdParams {
  id?: string | null | void;
}

/** 'FindStoreById' return type */
export interface IFindStoreByIdResult {
  addressId: string;
  addressUpdatedAt: Date;
  complement: string;
  country: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  logo: string | null;
  name: string;
  neighborhood: string;
  number: string;
  ownerId: string;
  ownerName: string;
  street: string;
  updatedAt: Date;
}

/** 'FindStoreById' query type */
export interface IFindStoreByIdQuery {
  params: IFindStoreByIdParams;
  result: IFindStoreByIdResult;
}

const findStoreByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":688,"b":690}]}],"statement":"SELECT\n    \"stores\".\"id\",\n    \"stores\".\"name\",\n    \"stores\".\"owner\" as \"ownerId\",\n    \"stores\".\"createdAt\",\n    \"stores\".\"updatedAt\",\n    \"stores\".\"deletedAt\",\n    \"address\".\"street\",\n    \"address\".\"neighborhood\",\n    \"address\".\"country\",\n    \"address\".\"number\",\n    \"address\".\"complement\",\n    \"address\".\"updatedAt\" as \"addressUpdatedAt\",\n    \"address\".\"id\" as \"addressId\",\n    \"store_profile\".\"logo\",\n    \"users\".\"name\" as \"ownerName\"\nFROM\n    \"stores\"\n    INNER JOIN \"store_profile\" on \"store_profile\".\"storeId\" = \"stores\".\"id\"\n    INNER JOIN \"address\" on \"address\".\"id\" = \"store_profile\".\"addressId\"\n    INNER JOIN \"users\" on \"users\".\"id\" = \"stores\".\"owner\"\nWHERE\n    \"stores\".\"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "stores"."id",
 *     "stores"."name",
 *     "stores"."owner" as "ownerId",
 *     "stores"."createdAt",
 *     "stores"."updatedAt",
 *     "stores"."deletedAt",
 *     "address"."street",
 *     "address"."neighborhood",
 *     "address"."country",
 *     "address"."number",
 *     "address"."complement",
 *     "address"."updatedAt" as "addressUpdatedAt",
 *     "address"."id" as "addressId",
 *     "store_profile"."logo",
 *     "users"."name" as "ownerName"
 * FROM
 *     "stores"
 *     INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
 *     INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
 *     INNER JOIN "users" on "users"."id" = "stores"."owner"
 * WHERE
 *     "stores"."id" = :id
 * ```
 */
export const findStoreById = new PreparedQuery<IFindStoreByIdParams,IFindStoreByIdResult>(findStoreByIdIR);


/** 'ListActiveStores' parameters type */
export type IListActiveStoresParams = void;

/** 'ListActiveStores' return type */
export interface IListActiveStoresResult {
  addressId: string;
  addressUpdatedAt: Date;
  complement: string;
  country: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  logo: string | null;
  name: string;
  neighborhood: string;
  number: string;
  ownerId: string;
  ownerName: string;
  street: string;
  updatedAt: Date;
}

/** 'ListActiveStores' query type */
export interface IListActiveStoresQuery {
  params: IListActiveStoresParams;
  result: IListActiveStoresResult;
}

const listActiveStoresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    \"stores\".\"id\",\n    \"stores\".\"name\",\n    \"stores\".\"owner\" as \"ownerId\",\n    \"stores\".\"createdAt\",\n    \"stores\".\"updatedAt\",\n    \"stores\".\"deletedAt\",\n    \"address\".\"street\",\n    \"address\".\"neighborhood\",\n    \"address\".\"country\",\n    \"address\".\"number\",\n    \"address\".\"complement\",\n    \"address\".\"updatedAt\" as \"addressUpdatedAt\",\n    \"address\".\"id\" as \"addressId\",\n    \"store_profile\".\"logo\",\n    \"users\".\"name\" as \"ownerName\"\nFROM\n    \"stores\"\n    INNER JOIN \"store_profile\" on \"store_profile\".\"storeId\" = \"stores\".\"id\"\n    INNER JOIN \"address\" on \"address\".\"id\" = \"store_profile\".\"addressId\"\n    INNER JOIN \"users\" on \"users\".\"id\" = \"stores\".\"owner\"\nWHERE\n    \"stores\".\"deletedAt\" is NULL"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "stores"."id",
 *     "stores"."name",
 *     "stores"."owner" as "ownerId",
 *     "stores"."createdAt",
 *     "stores"."updatedAt",
 *     "stores"."deletedAt",
 *     "address"."street",
 *     "address"."neighborhood",
 *     "address"."country",
 *     "address"."number",
 *     "address"."complement",
 *     "address"."updatedAt" as "addressUpdatedAt",
 *     "address"."id" as "addressId",
 *     "store_profile"."logo",
 *     "users"."name" as "ownerName"
 * FROM
 *     "stores"
 *     INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
 *     INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
 *     INNER JOIN "users" on "users"."id" = "stores"."owner"
 * WHERE
 *     "stores"."deletedAt" is NULL
 * ```
 */
export const listActiveStores = new PreparedQuery<IListActiveStoresParams,IListActiveStoresResult>(listActiveStoresIR);


/** 'ListAllStores' parameters type */
export type IListAllStoresParams = void;

/** 'ListAllStores' return type */
export interface IListAllStoresResult {
  addressId: string;
  addressUpdatedAt: Date;
  complement: string;
  country: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  logo: string | null;
  name: string;
  neighborhood: string;
  number: string;
  ownerId: string;
  ownerName: string;
  street: string;
  updatedAt: Date;
}

/** 'ListAllStores' query type */
export interface IListAllStoresQuery {
  params: IListAllStoresParams;
  result: IListAllStoresResult;
}

const listAllStoresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    \"stores\".\"id\",\n    \"stores\".\"name\",\n    \"stores\".\"owner\" as \"ownerId\",\n    \"stores\".\"createdAt\",\n    \"stores\".\"updatedAt\",\n    \"stores\".\"deletedAt\",\n    \"address\".\"street\",\n    \"address\".\"neighborhood\",\n    \"address\".\"country\",\n    \"address\".\"number\",\n    \"address\".\"complement\",\n    \"address\".\"updatedAt\" as \"addressUpdatedAt\",\n    \"address\".\"id\" as \"addressId\",\n    \"store_profile\".\"logo\",\n    \"users\".\"name\" as \"ownerName\"\nFROM\n    \"stores\"\n    INNER JOIN \"store_profile\" on \"store_profile\".\"storeId\" = \"stores\".\"id\"\n    INNER JOIN \"address\" on \"address\".\"id\" = \"store_profile\".\"addressId\"\n    INNER JOIN \"users\" on \"users\".\"id\" = \"stores\".\"owner\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "stores"."id",
 *     "stores"."name",
 *     "stores"."owner" as "ownerId",
 *     "stores"."createdAt",
 *     "stores"."updatedAt",
 *     "stores"."deletedAt",
 *     "address"."street",
 *     "address"."neighborhood",
 *     "address"."country",
 *     "address"."number",
 *     "address"."complement",
 *     "address"."updatedAt" as "addressUpdatedAt",
 *     "address"."id" as "addressId",
 *     "store_profile"."logo",
 *     "users"."name" as "ownerName"
 * FROM
 *     "stores"
 *     INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
 *     INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
 *     INNER JOIN "users" on "users"."id" = "stores"."owner"
 * ```
 */
export const listAllStores = new PreparedQuery<IListAllStoresParams,IListAllStoresResult>(listAllStoresIR);


/** 'ListStoreEmployeesByStoreId' parameters type */
export interface IListStoreEmployeesByStoreIdParams {
  storeId?: string | null | void;
}

/** 'ListStoreEmployeesByStoreId' return type */
export interface IListStoreEmployeesByStoreIdResult {
  name: string;
  userId: string;
}

/** 'ListStoreEmployeesByStoreId' query type */
export interface IListStoreEmployeesByStoreIdQuery {
  params: IListStoreEmployeesByStoreIdParams;
  result: IListStoreEmployeesByStoreIdResult;
}

const listStoreEmployeesByStoreIdIR: any = {"usedParamSet":{"storeId":true},"params":[{"name":"storeId","required":false,"transform":{"type":"scalar"},"locs":[{"a":173,"b":180}]}],"statement":"select\n    \"user_store\".\"userId\",\n    \"users\".\"name\"\nfrom\n    \"user_store\"\n    inner join \"users\" on \"users\".\"id\" = \"user_store\".\"userId\"\nwhere\n    \"user_store\".\"storeId\" = :storeId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "user_store"."userId",
 *     "users"."name"
 * from
 *     "user_store"
 *     inner join "users" on "users"."id" = "user_store"."userId"
 * where
 *     "user_store"."storeId" = :storeId
 * ```
 */
export const listStoreEmployeesByStoreId = new PreparedQuery<IListStoreEmployeesByStoreIdParams,IListStoreEmployeesByStoreIdResult>(listStoreEmployeesByStoreIdIR);


/** 'SoftDeleteStore' parameters type */
export interface ISoftDeleteStoreParams {
  deletedAt?: Date | string | null | void;
  id?: string | null | void;
}

/** 'SoftDeleteStore' return type */
export type ISoftDeleteStoreResult = void;

/** 'SoftDeleteStore' query type */
export interface ISoftDeleteStoreQuery {
  params: ISoftDeleteStoreParams;
  result: ISoftDeleteStoreResult;
}

const softDeleteStoreIR: any = {"usedParamSet":{"deletedAt":true,"id":true},"params":[{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51},{"a":72,"b":81}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":102}]}],"statement":"UPDATE\n    \"stores\"\nSET\n    \"deletedAt\" = :deletedAt,\n    \"updatedAt\" = :deletedAt\nwhere\n    \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE
 *     "stores"
 * SET
 *     "deletedAt" = :deletedAt,
 *     "updatedAt" = :deletedAt
 * where
 *     "id" = :id
 * ```
 */
export const softDeleteStore = new PreparedQuery<ISoftDeleteStoreParams,ISoftDeleteStoreResult>(softDeleteStoreIR);


