/** Types generated for queries found in "src/engines/database/sql/address.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateAddress' parameters type */
export interface ICreateAddressParams {
  complement?: string | null | void;
  country?: string | null | void;
  id?: string | null | void;
  neighborhood?: string | null | void;
  number?: string | null | void;
  street?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreateAddress' return type */
export type ICreateAddressResult = void;

/** 'CreateAddress' query type */
export interface ICreateAddressQuery {
  params: ICreateAddressParams;
  result: ICreateAddressResult;
}

const createAddressIR: any = {"usedParamSet":{"id":true,"street":true,"neighborhood":true,"country":true,"number":true,"complement":true,"updatedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":190,"b":192}]},{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":203,"b":209}]},{"name":"neighborhood","required":false,"transform":{"type":"scalar"},"locs":[{"a":220,"b":232}]},{"name":"country","required":false,"transform":{"type":"scalar"},"locs":[{"a":243,"b":250}]},{"name":"number","required":false,"transform":{"type":"scalar"},"locs":[{"a":261,"b":267}]},{"name":"complement","required":false,"transform":{"type":"scalar"},"locs":[{"a":278,"b":288}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":299,"b":308}]}],"statement":"INSERT INTO\n    \"address\" (\n        \"id\",\n        \"street\",\n        \"neighborhood\",\n        \"country\",\n        \"number\",\n        \"complement\",\n        \"updatedAt\"\n    )\nVALUES\n    (\n        :id,\n        :street,\n        :neighborhood,\n        :country,\n        :number,\n        :complement,\n        :updatedAt\n    )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "address" (
 *         "id",
 *         "street",
 *         "neighborhood",
 *         "country",
 *         "number",
 *         "complement",
 *         "updatedAt"
 *     )
 * VALUES
 *     (
 *         :id,
 *         :street,
 *         :neighborhood,
 *         :country,
 *         :number,
 *         :complement,
 *         :updatedAt
 *     )
 * ```
 */
export const createAddress = new PreparedQuery<ICreateAddressParams,ICreateAddressResult>(createAddressIR);


/** 'FindAddressById' parameters type */
export interface IFindAddressByIdParams {
  id?: string | null | void;
}

/** 'FindAddressById' return type */
export interface IFindAddressByIdResult {
  complement: string;
  country: string;
  id: string;
  neighborhood: string;
  number: string;
  street: string;
  updatedAt: Date;
}

/** 'FindAddressById' query type */
export interface IFindAddressByIdQuery {
  params: IFindAddressByIdParams;
  result: IFindAddressByIdResult;
}

const findAddressByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":61}]}],"statement":"select\n    *\nfrom\n    \"address\"\nwhere\n    \"address\".\"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     *
 * from
 *     "address"
 * where
 *     "address"."id" = :id
 * ```
 */
export const findAddressById = new PreparedQuery<IFindAddressByIdParams,IFindAddressByIdResult>(findAddressByIdIR);


/** 'FindAddressByStoreId' parameters type */
export interface IFindAddressByStoreIdParams {
  id?: string | null | void;
}

/** 'FindAddressByStoreId' return type */
export interface IFindAddressByStoreIdResult {
  complement: string;
  country: string;
  id: string;
  neighborhood: string;
  number: string;
  street: string;
  updatedAt: Date;
}

/** 'FindAddressByStoreId' query type */
export interface IFindAddressByStoreIdQuery {
  params: IFindAddressByStoreIdParams;
  result: IFindAddressByStoreIdResult;
}

const findAddressByStoreIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":377,"b":379}]}],"statement":"select\n    \"address\".\"id\",\n    \"address\".\"street\",\n    \"address\".\"neighborhood\",\n    \"address\".\"country\",\n    \"address\".\"number\",\n    \"address\".\"complement\",\n    \"address\".\"updatedAt\"\nfrom\n    \"address\"\n    inner join \"store_profile\" on \"store_profile\".\"addressId\" = \"address\".\"id\"\n    inner join \"stores\" on \"stores\".\"id\" = \"store_profile\".\"storeId\"\nwhere\n    \"stores\".\"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "address"."id",
 *     "address"."street",
 *     "address"."neighborhood",
 *     "address"."country",
 *     "address"."number",
 *     "address"."complement",
 *     "address"."updatedAt"
 * from
 *     "address"
 *     inner join "store_profile" on "store_profile"."addressId" = "address"."id"
 *     inner join "stores" on "stores"."id" = "store_profile"."storeId"
 * where
 *     "stores"."id" = :id
 * ```
 */
export const findAddressByStoreId = new PreparedQuery<IFindAddressByStoreIdParams,IFindAddressByStoreIdResult>(findAddressByStoreIdIR);


/** 'UpdateAddress' parameters type */
export interface IUpdateAddressParams {
  complement?: string | null | void;
  country?: string | null | void;
  id?: string | null | void;
  neighborhood?: string | null | void;
  number?: string | null | void;
  street?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'UpdateAddress' return type */
export type IUpdateAddressResult = void;

/** 'UpdateAddress' query type */
export interface IUpdateAddressQuery {
  params: IUpdateAddressParams;
  result: IUpdateAddressResult;
}

const updateAddressIR: any = {"usedParamSet":{"street":true,"neighborhood":true,"country":true,"number":true,"complement":true,"updatedAt":true,"id":true},"params":[{"name":"street","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":46}]},{"name":"neighborhood","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":82}]},{"name":"country","required":false,"transform":{"type":"scalar"},"locs":[{"a":101,"b":108}]},{"name":"number","required":false,"transform":{"type":"scalar"},"locs":[{"a":126,"b":132}]},{"name":"complement","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":164}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":185,"b":194}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":213,"b":215}]}],"statement":"UPDATE\n    \"address\"\nSET\n    \"street\" = :street,\n    \"neighborhood\" = :neighborhood,\n    \"country\" = :country,\n    \"number\" = :number,\n    \"complement\" = :complement,\n    \"updatedAt\" = :updatedAt\nwhere\n    \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE
 *     "address"
 * SET
 *     "street" = :street,
 *     "neighborhood" = :neighborhood,
 *     "country" = :country,
 *     "number" = :number,
 *     "complement" = :complement,
 *     "updatedAt" = :updatedAt
 * where
 *     "id" = :id
 * ```
 */
export const updateAddress = new PreparedQuery<IUpdateAddressParams,IUpdateAddressResult>(updateAddressIR);


