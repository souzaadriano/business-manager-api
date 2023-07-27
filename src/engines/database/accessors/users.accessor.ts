import { Singleton } from '@/helpers/singleton.decorator';
import { DATABASE_OPERATION, DatabaseException } from '../database.exception';
import {
  ICreateUserParams,
  IFindByEmailParams,
  IFindByEmailResult,
  createUser,
  findByEmail,
} from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

@Singleton
export class UsersAccessor extends AbstractDatabaseAccessor {
  async createUser(params: ICreateUserParams): Promise<void> {
    console.debug(params);
    await this._database.execute(params, createUser).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.INSERT, statement: 'createUser' });
    });
  }

  async findByEmail(params: IFindByEmailParams): Promise<IFindByEmailResult> {
    console.debug(params);
    return await this._database.queryOne(params, findByEmail).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.SELECT, statement: 'findByEmail' });
    });
  }
}
