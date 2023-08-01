import { Session } from '@/core/domain/class/session/session.class';
import { SessionDto } from '@/core/domain/class/session/session.dto';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { REDIS_COMMAND, RedisCommandException } from '../exceptions/redis-command.exception';
import { AbstractRedisAccessor } from './redis-accessor.abstract';

export class RedisSessionAccessor extends AbstractRedisAccessor {
  async setSession(session: Session): Promise<void> {
    const sessionDto = session.toSessionDTO();
    await this._redis.set(session.key, sessionDto.toJson(), session.expireTimeInSeconds).catch((error) => {
      throw new RedisCommandException({
        error,
        key: session.key,
        operation: REDIS_COMMAND.SET,
        statement: 'setSession',
      });
    });
  }

  async getSession(token: UserToken): Promise<SessionDto> {
    return await this._getSession(token.key);
  }

  async searchSessionByUserId(userId: string): Promise<SessionDto | undefined> {
    const [userSessionKey] = await this._redis.find(UserToken.keyMaker(userId));
    if (!userSessionKey) return undefined;

    return this._getSession(userSessionKey);
  }

  async refreshSession(token: UserToken, ttlInSeconds: number): Promise<void> {
    await this._redis.ttl(token.key, ttlInSeconds).catch((error) => {
      throw new RedisCommandException({
        error,
        key: token.key,
        operation: REDIS_COMMAND.TTL,
        statement: 'refreshSession',
      });
    });
  }

  private async _getSession(key: string): Promise<SessionDto> {
    const input = await this._redis.get(key).catch((error) => {
      throw new RedisCommandException({
        error,
        key,
        operation: REDIS_COMMAND.GET_OBJECT,
        statement: 'getSession',
      });
    });
    return SessionDto.fromString(input);
  }
}
