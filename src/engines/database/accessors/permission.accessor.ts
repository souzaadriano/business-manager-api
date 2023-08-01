import { DATABASE_OPERATION, DatabaseException } from '../database.exception';
import { ICreatePermissionParams, createPermission, findAllPermission } from '../queries/permissions.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class PermissionAccessor extends AbstractDatabaseAccessor {
  async addPermissions(input: ICreatePermissionParams[]) {
    for (const permission of input) {
      await this._database.execute(permission, createPermission).catch((error) => {
        throw new DatabaseException({ error, operation: DATABASE_OPERATION.INSERT, statement: 'addPermissions' });
      });
    }
  }

  async readPermissions() {
    return await this._database.query(undefined, findAllPermission).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.SELECT, statement: 'readPermissions' });
    });
  }
}
