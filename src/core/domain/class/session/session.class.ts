import { DATE_FORMAT } from '@/core/adapters/handlers/date-handler/date-handler.enum';
import { ISessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.contract';
import { ITokenHandler } from '@/core/adapters/handlers/token-handler/token-handler.contract';
import { UserDTO } from '../../dtos/user.dto';
import { DateTime } from '../date-time/date-time.class';
import { PERMISSIONS } from '../permissions/permission.enum';
import { Permissions } from '../permissions/permissions.class';
import { TimeConverter } from '../time-converter/time-converter.class';
import { UserToken } from '../token/user-token.class';
import { Uuid } from '../uuid/uuid.class';
import { SessionDto } from './session.dto';

export class Session {
  private readonly _token: UserToken;
  private _tokenValue: string;
  private readonly _handler: ISessionHandler;
  private readonly _id: Uuid;
  private readonly _permissions: Permissions;
  private readonly _user: UserDTO;
  private readonly _issuedAt: DateTime;
  private _expireAt: DateTime;
  private readonly _refreshTime: TimeConverter;
  private readonly _tokenHandler: ITokenHandler<UserToken>;

  constructor(parameters: TSessionParameters) {
    this._token = new UserToken({
      sessionId: parameters.id,
      userId: new Uuid(parameters.user.id),
    });

    this._id = parameters.id;
    this._handler = parameters.handler;
    this._permissions = parameters.permissions;
    this._user = parameters.user;
    this._issuedAt = parameters.issuedAt;
    this._expireAt = parameters.issuedAt.clone();
    this._expireAt.add({ minutes: parameters.refreshTime.minutes() });
    this._refreshTime = parameters.refreshTime;
    this._tokenHandler = parameters.tokenHandler;
    if (parameters.token) this._tokenValue = parameters.token;
  }

  get id(): string {
    return this._id.value;
  }

  get userId(): string {
    return this._user.id;
  }

  getUser(): UserDTO {
    return this._user;
  }

  async token() {
    if (this._tokenValue) return { token: this._tokenValue, payload: this._token };
    const bearerToken = await this._tokenHandler.sign(this._token);
    this._tokenValue = bearerToken.value;
    return { payload: this._token, token: this._tokenValue };
  }

  hasPermission(permission: PERMISSIONS): boolean {
    return this._permissions.has(permission);
  }

  hasStore(storeId: string | Uuid): boolean {
    return storeId instanceof Uuid ? this._permissions.store(storeId) : this._permissions.store(Uuid.create(storeId));
  }

  get issuedAt() {
    return this._issuedAt.clone();
  }

  get expireAt() {
    return this._expireAt.clone();
  }

  get isExpired(): boolean {
    return this._expireAt.isBefore(new Date());
  }

  get expireTimeInSeconds() {
    return this._refreshTime.seconds();
  }

  get key() {
    return this._token.key;
  }

  async refresh(): Promise<void> {
    const refreshTimeInSeconds = this._refreshTime.seconds();
    await this._handler.refreshTTL(this, refreshTimeInSeconds);
    this._expireAt.add({ seconds: refreshTimeInSeconds });
  }

  async close(): Promise<void> {
    this._handler.close(this);
    this._expireAt.sub({ seconds: this._refreshTime.seconds() });
  }

  toSessionDTO(): SessionDto {
    return new SessionDto({
      expireAt: this._expireAt.toString(DATE_FORMAT.STANDARD),
      issuedAt: this._issuedAt.toString(DATE_FORMAT.STANDARD),
      id: this._id.value,
      permissions: this._permissions.list(),
      user: this._user,
      token: this._tokenValue,
      storeIds: this._permissions.stores(),
    });
  }
}

type TSessionParameters = {
  handler: ISessionHandler;
  id: Uuid;
  permissions: Permissions;
  user: UserDTO;
  issuedAt: DateTime;
  refreshTime: TimeConverter;
  tokenHandler: ITokenHandler<UserToken>;
  token?: string;
};
