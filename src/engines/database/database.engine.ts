import { Singleton } from '@/helpers/singleton.decorator';
import { PreparedQuery } from '@pgtyped/runtime';
import { Client } from 'pg';
import { IEngine } from '../engine.contract';
import { DatabaseConfig } from './database.config';

@Singleton
export class DatabaseEngine implements IEngine {
  private readonly _configuration = new DatabaseConfig();
  private _client: Client;

  async init(): Promise<void> {
    if (this._client) return;
    this._client = new Client(this._configuration);
    await this._client.connect();
  }

  public async query<INPUT, OUTPUT>(params: INPUT, fn: PreparedQuery<INPUT, OUTPUT>): Promise<OUTPUT[]> {
    this._isConnected();
    return await fn.run(params, this._client);
  }

  public async queryOne<INPUT, OUTPUT>(params: INPUT, fn: PreparedQuery<INPUT, OUTPUT>): Promise<OUTPUT | undefined> {
    const [output] = await this.query(params, fn);
    return output;
  }

  public async execute<INPUT, OUTPUT>(params: INPUT, fn: PreparedQuery<INPUT, OUTPUT>): Promise<void> {
    await this.query(params, fn);
  }

  private _isConnected(): void {
    if (this._client) return;
    throw new Error('database not connected');
  }
}
