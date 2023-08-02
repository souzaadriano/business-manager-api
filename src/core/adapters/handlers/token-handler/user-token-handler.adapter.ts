import { SecretConfig } from '@/configurations/secret.config';
import { BearerToken } from '@/core/domain/class/token/bearer-token.class';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { decode, sign, verify } from 'jsonwebtoken';
import { ITokenHandler } from './token-handler.contract';

export class UserTokenHandler implements ITokenHandler<UserToken> {
  constructor(private readonly _dependencies: Dependencies) {}

  async sign(payload: UserToken): Promise<BearerToken> {
    const { configuration } = this._dependencies;
    const data = payload.toDTO();
    const value = sign(data, configuration.jwt);
    return new BearerToken(value);
  }
  async verify(token: BearerToken): Promise<boolean> {
    const { configuration } = this._dependencies;
    try {
      verify(token.value, configuration.jwt);
      return true;
    } catch (error) {
      return false;
    }
  }
  async decode(token: BearerToken): Promise<UserToken> {
    if (!(await this.verify(token))) throw new Error();
    const payload = decode(token.value);

    if (typeof payload === 'string') throw new Error();
    if (!payload.sessionId) throw new Error();
    if (!payload.userId) throw new Error();

    return new UserToken({
      sessionId: Uuid.create(payload.sessionId),
      userId: Uuid.create(payload.userId),
    });
  }
}

type Dependencies = {
  readonly configuration: SecretConfig;
};
