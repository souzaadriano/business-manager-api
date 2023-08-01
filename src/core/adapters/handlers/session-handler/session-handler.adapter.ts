import { DateTime } from '@/core/domain/class/date-time/date-time.class';
import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Session } from '@/core/domain/class/session/session.class';
import { SessionDto } from '@/core/domain/class/session/session.dto';
import { TimeConverter } from '@/core/domain/class/time-converter/time-converter.class';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { RedisSessionAccessor } from '@/engines/redis/accessors/redis-session.accessor';
import { IDateHandler } from '../date-handler/date-handler.contract';
import { IGeneratorHandler } from '../generator-handler/generator-handler.contract';
import { ITokenHandler } from '../token-handler/token-handler.contract';
import { ISessionHandler, TCreateSessionInput } from './session-handler.contract';

export class SessionHandler implements ISessionHandler {
  constructor(private readonly _dependencies: Dependencies) {}

  async create(input: TCreateSessionInput): Promise<Session> {
    const { user, permissions } = input;
    const { generator, dateHandler, accessor, tokenHandler } = this._dependencies;
    const currentSession = await accessor.searchSessionByUserId(user.id);
    if (currentSession) return this._getCurrentSession(currentSession);

    const session = new Session({
      id: generator.uuid(),
      handler: this,
      issuedAt: DateTime.now(dateHandler),
      refreshTime: new TimeConverter({ hours: 2 }),
      user: user.toDto(),
      permissions: permissions,
      tokenHandler: tokenHandler,
    });
    await session.token();
    await accessor.setSession(session);
    return session;
  }

  async refreshTTL(session: Session, ttlInSeconds: number): Promise<void> {
    const { accessor } = this._dependencies;
    const { payload } = await session.token();
    await accessor.refreshSession(payload, ttlInSeconds);
  }

  close(session: Session): Promise<void> {
    throw new Error('Method not implemented.');
  }

  parseDTO(sessionDto: SessionDto): Promise<Session> {
    throw new Error('Method not implemented.');
  }

  private async _getCurrentSession(input: SessionDto): Promise<Session> {
    const sessionDto = input;
    const { dateHandler, tokenHandler } = this._dependencies;
    const session = new Session({
      id: new Uuid(sessionDto.id),
      handler: this,
      issuedAt: dateHandler.toDateTime(new Date(sessionDto.issuedAt)),
      refreshTime: new TimeConverter({ hours: 2 }),
      user: sessionDto.user,
      permissions: Permissions.fromArray(sessionDto.permissions, sessionDto.storeIds),
      tokenHandler: tokenHandler,
      token: sessionDto.token,
    });

    return session;
  }
}

type Dependencies = {
  accessor: RedisSessionAccessor;
  generator: IGeneratorHandler;
  dateHandler: IDateHandler;
  tokenHandler: ITokenHandler<UserToken>;
};
