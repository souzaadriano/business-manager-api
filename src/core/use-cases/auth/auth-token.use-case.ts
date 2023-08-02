import { ITokenHandler } from '@/core/adapters/handlers/token-handler/token-handler.contract';
import { BearerToken } from '@/core/domain/class/token/bearer-token.class';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { AbstractUseCase } from '../use-case.abstract';

export class AuthTokenUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Output> {
    const { token } = input;
    const { tokenHandler } = this._dependencies;
    const bearerToken = this._instanceBearerToken(token);
    const userToken = await tokenHandler.decode(bearerToken);

    return userToken;
  }

  private _instanceBearerToken(token?: string) {
    if (!token) throw new Error();
    return BearerToken.create(token);
  }
}

type Input = { token?: string };
type Output = { sessionId: string; userId: string };
type Dependencies = {
  tokenHandler: ITokenHandler<UserToken>;
};
