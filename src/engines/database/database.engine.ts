import { Singleton } from '@/helpers/singleton.decorator';
import { PreparedQuery } from '@pgtyped/runtime';
import { Client } from 'pg';
import { IEngine } from '../engine.contract';
import { DatabaseConfig } from './database.config';
import { DATABASE_OPERATION, DatabaseException } from './database.exception';

@Singleton
export class DatabaseEngine implements IEngine {
  private readonly _configuration = new DatabaseConfig();
  private _client: Client;

  async init(): Promise<void> {
    if (this._client) return;
    this._client = new Client(this._connectionOptions());
    await this._client.connect();
  }

  insert<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(DATABASE_OPERATION.INSERT, fn);
  }

  delete<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(DATABASE_OPERATION.DELETE, fn);
  }

  update<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(DATABASE_OPERATION.UPDATE, fn);
  }

  select<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TQueryCommand<INPUT, OUTPUT[]> {
    return this._query(DATABASE_OPERATION.SELECT, fn);
  }

  first<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TQueryCommand<INPUT, OUTPUT> {
    return this._queryOne(DATABASE_OPERATION.SELECT, fn);
  }

  upsert<INPUT, OUTPUT>(fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(DATABASE_OPERATION.UPSERT, fn);
  }

  private _query<INPUT, OUTPUT>(operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    return async (params: INPUT): Promise<OUTPUT[]> => {
      return await fn.run(params, this._client).catch((error) => {
        console.error(error);
        throw new DatabaseException({ error, operation, statement: DatabaseEngine._nameOf(fn) });
      });
    };
  }

  private _queryOne<INPUT, OUTPUT>(operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    const executor = this._query(operation, fn);
    return async (params: INPUT): Promise<OUTPUT | undefined> => {
      const [output] = await executor(params);
      return output;
    };
  }

  private _execute<INPUT, OUTPUT>(operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    const executor = this._query(operation, fn);
    return async (params: INPUT): Promise<void> => {
      await executor(params);
    };
  }

  private _isConnected(): void {
    if (this._client) return;
    throw new Error('database not connected');
  }

  private static _nameOf(f: any) {
    return f.toString().replace(/[ |\(\)=>]/g, '');
  }

  private _connectionOptions() {
    return {
      host: this._configuration.host,
      password: this._configuration.password,
      user: this._configuration.user,
      database: this._configuration.database,
      port: this._configuration.port,
    };
  }
}

export type TExecuteCommand<INPUT> = (params: INPUT) => Promise<void>;
export type TQueryCommand<INPUT, OUTPUT> = (params: INPUT) => Promise<OUTPUT>;
