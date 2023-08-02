import { Singleton } from '@/helpers/singleton.decorator';
import {
  createUser,
  deleteAllUsers,
  findByEmail,
  findById,
  findStoresByUserId,
  findUserPermissionsByUserId,
  softDeleteUser,
  updateUser,
} from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

@Singleton
export class UsersAccessor extends AbstractDatabaseAccessor {
  readonly createUser = this._database.insert(createUser);
  readonly findByEmail = this._database.first(findByEmail);
  readonly deleteAllUsers = this._database.delete(deleteAllUsers);
  readonly findUserPermissionsByUserId = this._database.select(findUserPermissionsByUserId);
  readonly findStoresByUserId = this._database.select(findStoresByUserId);
  readonly softDeleteUser = this._database.update(softDeleteUser);
  readonly updateUser = this._database.update(updateUser);
  readonly findById = this._database.first(findById);
}
