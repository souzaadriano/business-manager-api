import { Singleton } from 'environment-variables-decorator';
import { Redis } from 'ioredis';
import { IEngine } from '../engine.contract';
import { RedisConfig } from './redis.config';

@Singleton
export class RedisEngine implements IEngine {
  private readonly _configuration = new RedisConfig();
  private _client: Redis;

  async init(): Promise<void> {
    console.log(this._configuration.toObject());
    if (this._client) return;

    this._client = new Redis({
      host: this._configuration.host,
      db: 0,
      port: this._configuration.port,
      password: this._configuration.password,
      lazyConnect: true,
    });

    await this._client.connect();
  }

  async getObject<T extends {}>(key: string): Promise<T | undefined> {
    this._isConnected();
    const data = await this._client.get(key);
    return data ? JSON.parse(data) : undefined;
  }

  async setJson<T extends {} = any>(key: string, value: T, ttl?: number) {
    this._isConnected();
    ttl
      ? await this._client.set(key, JSON.stringify(value), 'EX', ttl)
      : await this._client.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    this._isConnected();
    const data = await this._client.get(key);
    return data;
  }

  async find(searchQuery: string): Promise<string[]> {
    return await this._client.keys(searchQuery);
  }

  async set(key: string, value: string, ttl?: number) {
    this._isConnected();
    ttl ? await this._client.set(key, value, 'EX', ttl) : await this._client.set(key, value);
  }

  async ttl(key: string, seconds: number) {
    this._isConnected();
    await this._client.expire(key, seconds);
  }

  private _isConnected(): void {
    if (this._client) return;
    throw new Error('redis not connected');
  }
}
