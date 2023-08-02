import { deleteAllUsers } from '../queries/users.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class DeleteAccessor extends AbstractDatabaseAccessor {
  readonly deleteAllUsers = this._database.delete(deleteAllUsers);
}
