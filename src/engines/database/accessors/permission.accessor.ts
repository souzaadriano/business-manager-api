import { createPermission, deleteAllPermissions, findAllPermission } from '../queries/permissions.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class PermissionAccessor extends AbstractDatabaseAccessor {
  findAllPermission = this._database.select(findAllPermission);
  createPermission = this._database.insert(createPermission);
  hardDeleteAllPermissions = this._database.delete(deleteAllPermissions);
}
