import { DATABASE_OPERATION, DatabaseException } from '../database.exception';
import { deleteAllUsers } from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class DeleteAccessor extends AbstractDatabaseAccessor {
  async deleteAllUsers(): Promise<void> {
    return await this._database.execute(undefined, deleteAllUsers).catch((error) => {
      throw new DatabaseException({ error, operation: DATABASE_OPERATION.DELETE, statement: 'deleteAllUsers' });
    });
  }
}
