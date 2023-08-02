import { Singleton } from '@/helpers/singleton.decorator';
import {
  createUser,
  findByEmail,
  findById,
  findManyUsersByEmail,
  findStoresByUserId,
  findUserPermissionsByUserId,
  hardDeleteUsers,
  hardDeleteUsersNotInList,
  softDeleteUser,
  updateUser,
} from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

@Singleton
export class UsersAccessor extends AbstractDatabaseAccessor {
  readonly createUser = this._database.insert(createUser);
  readonly findByEmail = this._database.first(findByEmail);
  readonly hardDeleteUsers = this._database.delete(hardDeleteUsers);
  readonly hardDeleterAllUsersNotInParams = this._database.delete(hardDeleteUsersNotInList);
  readonly findUserPermissionsByUserId = this._database.select(findUserPermissionsByUserId);
  readonly findStoresByUserId = this._database.select(findStoresByUserId);
  readonly softDeleteUser = this._database.update(softDeleteUser);
  readonly updateUser = this._database.update(updateUser);
  readonly findById = this._database.first(findById);
  readonly findManyByEmail = this._database.select(findManyUsersByEmail);
}
