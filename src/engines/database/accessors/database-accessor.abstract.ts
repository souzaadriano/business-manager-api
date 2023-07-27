import { DatabaseEngine } from '../database.engine';

export abstract class AbstractDatabaseAccessor {
  protected readonly _database: DatabaseEngine = new DatabaseEngine();
}
