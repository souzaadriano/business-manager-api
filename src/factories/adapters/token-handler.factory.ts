import { SecretConfig } from '@/configurations/secret.config';
import { ITokenHandler } from '@/core/adapters/handlers/token-handler/token-handler.contract';
import { UserTokenHandler } from '@/core/adapters/handlers/token-handler/user-token-handler.adapter';
import { UserToken } from '@/core/domain/class/token/user-token.class';

export abstract class TokenHandlerFactory {
  private static _userTokenHandler: ITokenHandler<UserToken>;

  static userToken(): ITokenHandler<UserToken> {
    if (!TokenHandlerFactory._userTokenHandler) {
      TokenHandlerFactory._userTokenHandler = new UserTokenHandler({
        configuration: new SecretConfig(),
      });
    }

    return TokenHandlerFactory._userTokenHandler;
  }
}
