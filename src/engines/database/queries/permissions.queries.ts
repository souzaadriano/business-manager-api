/** Types generated for queries found in "src/engines/database/sql/permissions.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindAllPermission' parameters type */
export type IFindAllPermissionParams = void;

/** 'FindAllPermission' return type */
export interface IFindAllPermissionResult {
  id: string;
  name: string;
}

/** 'FindAllPermission' query type */
export interface IFindAllPermissionQuery {
  params: IFindAllPermissionParams;
  result: IFindAllPermissionResult;
}

const findAllPermissionIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    \"id\",\n    \"name\"\nFROM\n    \"permissions\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "id",
 *     "name"
 * FROM
 *     "permissions"
 * ```
 */
export const findAllPermission = new PreparedQuery<IFindAllPermissionParams,IFindAllPermissionResult>(findAllPermissionIR);


/** 'CreatePermission' parameters type */
export interface ICreatePermissionParams {
  createdAt?: Date | string | null | void;
  deletedAt?: Date | string | null | void;
  id?: string | null | void;
  name?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreatePermission' return type */
export type ICreatePermissionResult = void;

/** 'CreatePermission' query type */
export interface ICreatePermissionQuery {
  params: ICreatePermissionParams;
  result: ICreatePermissionResult;
}

const createPermissionIR: any = {"usedParamSet":{"id":true,"name":true,"createdAt":true,"updatedAt":true,"deletedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":151,"b":153}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":164,"b":168}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":179,"b":188}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":199,"b":208}]},{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":219,"b":228}]}],"statement":"INSERT INTO\n    \"permissions\" (\n        \"id\",\n        \"name\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    (\n        :id,\n        :name,\n        :createdAt,\n        :updatedAt,\n        :deletedAt\n    )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "permissions" (
 *         "id",
 *         "name",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     (
 *         :id,
 *         :name,
 *         :createdAt,
 *         :updatedAt,
 *         :deletedAt
 *     )
 * ```
 */
export const createPermission = new PreparedQuery<ICreatePermissionParams,ICreatePermissionResult>(createPermissionIR);


/** 'DeleteAllPermissions' parameters type */
export type IDeleteAllPermissionsParams = void;

/** 'DeleteAllPermissions' return type */
export type IDeleteAllPermissionsResult = void;

/** 'DeleteAllPermissions' query type */
export interface IDeleteAllPermissionsQuery {
  params: IDeleteAllPermissionsParams;
  result: IDeleteAllPermissionsResult;
}

const deleteAllPermissionsIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM\n    \"permissions\""};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM
 *     "permissions"
 * ```
 */
export const deleteAllPermissions = new PreparedQuery<IDeleteAllPermissionsParams,IDeleteAllPermissionsResult>(deleteAllPermissionsIR);


