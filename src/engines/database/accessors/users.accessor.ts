import { Singleton } from '@/helpers/singleton.decorator';
import { DATABASE_OPERATION, DatabaseException } from '../database.exception';
import {
  ICreateUserParams,
  IFindByEmailParams,
  IFindByEmailResult,
  IFindStoresByUserIdParams,
  IFindStoresByUserIdResult,
  IFindUserPermissionsByUserIdParams,
  IFindUserPermissionsByUserIdResult,
  createUser,
  findByEmail,
  findStoresByUserId,
  findUserPermissionsByUserId,
} from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

@Singleton
export class UsersAccessor extends AbstractDatabaseAccessor {
  async createUser(params: ICreateUserParams): Promise<void> {
    await this._database.execute(params, createUser).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.INSERT, statement: 'createUser' });
    });
  }

  async findByEmail(params: IFindByEmailParams): Promise<IFindByEmailResult> {
    return await this._database.queryOne(params, findByEmail).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.SELECT, statement: 'findByEmail' });
    });
  }

  async findStoresByUserId(params: IFindStoresByUserIdParams): Promise<IFindStoresByUserIdResult[]> {
    return await this._database.query(params, findStoresByUserId).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.SELECT, statement: 'findStoresByUserId' });
    });
  }

  async findPermissionsByUserId(
    params: IFindUserPermissionsByUserIdParams,
  ): Promise<IFindUserPermissionsByUserIdResult[]> {
    return await this._database.query(params, findUserPermissionsByUserId).catch((error) => {
      throw new DatabaseException({
        error,
        operation: DATABASE_OPERATION.SELECT,
        statement: 'findPermissionsByUserId',
      });
    });
  }
}
