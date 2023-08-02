import { REDIS_KEY_PREFIX } from '@/engines/redis/accessors/key-prefix.enum';
import { Uuid } from '../uuid/uuid.class';
import { UserTokenDto } from './user-token.dto';

export class UserToken {
  private static readonly _prefix = REDIS_KEY_PREFIX.USER_SESSION;
  private readonly _sessionId: Uuid;
  private readonly _userId: Uuid;

  constructor(parameters: TUserTokenParameters) {
    this._sessionId = parameters.sessionId;
    this._userId = parameters.userId;
  }

  static fromTokenPayload(tokenDto: UserTokenDto) {
    return new UserToken({
      sessionId: Uuid.create(tokenDto.sessionId),
      userId: Uuid.create(tokenDto.userId),
    });
  }

  static keyMaker(userId?: string, sessionId?: string) {
    return `${UserToken._prefix}:${userId ?? '*'}.${sessionId ?? '*'}`;
  }

  get userId() {
    return this._userId.value;
  }

  get sessionId() {
    return this._sessionId.value;
  }

  get key(): string {
    return UserToken.keyMaker(this.userId, this.sessionId);
  }

  toDTO(): UserTokenDto {
    return { sessionId: this.sessionId, userId: this.userId };
  }
}

type TUserTokenParameters = {
  sessionId: Uuid;
  userId: Uuid;
};
