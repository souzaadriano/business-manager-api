import { ICreatePermissionParams, createPermission } from '../queries/permissions.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class PermissionAccessor extends AbstractDatabaseAccessor {
  async addPermissions(input: ICreatePermissionParams[]) {
    for (const permission of input) {
      await this._database.execute(permission, createPermission);
    }
  }
}
