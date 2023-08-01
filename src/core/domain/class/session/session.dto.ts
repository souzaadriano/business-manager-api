import { UserDTO } from '../../dtos/user.dto';
import { PERMISSIONS } from '../permissions/permission.enum';
import { Permissions } from '../permissions/permissions.class';
import { UserToken } from '../token/user-token.class';
import { Uuid } from '../uuid/uuid.class';

export class SessionDto {
  private readonly _token: UserToken;
  readonly permissions: PERMISSIONS[];
  readonly storeIds: string[];
  readonly id: string;
  readonly user: UserDTO;
  readonly issuedAt: string;
  readonly expireAt: string;
  private _tokenValue?: string;

  constructor(parameters: TSessionDTOConstructor) {
    this._token = new UserToken({
      sessionId: Uuid.create(parameters.id),
      userId: Uuid.create(parameters.user.id),
    });
    this.permissions = Permissions.fromArray(parameters.permissions).list();
    this.id = parameters.id;
    this.user = parameters.user;
    this.issuedAt = parameters.issuedAt;
    this.expireAt = parameters.expireAt;
    this._tokenValue = parameters.token;
    this.storeIds = parameters.storeIds;
  }

  static fromString(input: string) {
    const parameters: TSessionDTOConstructor = JSON.parse(input);
    return new SessionDto(parameters);
  }

  get key(): string {
    return this._token.key;
  }

  get token(): string | undefined {
    return this._tokenValue;
  }

  toJson() {
    return JSON.stringify({
      permissions: this.permissions,
      storeids: this.storeIds,
      id: this.id,
      user: {
        name: this.user.name,
        id: this.user.id,
        email: this.user.email,
      },
      issuedAt: this.issuedAt,
      expireAt: this.expireAt,
      token: this._tokenValue,
    });
  }
}

export type TSessionDTOConstructor = {
  readonly permissions: string[];
  readonly id: string;
  readonly user: UserDTO;
  readonly issuedAt: string;
  readonly expireAt: string;
  readonly token?: string;
  readonly storeIds: string[];
};
