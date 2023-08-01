import { RedisEngine } from '../redis.engine';

export abstract class AbstractRedisAccessor {
  protected readonly _redis: RedisEngine = new RedisEngine();
}
