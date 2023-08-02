import { AuthTokenUseCase } from '@/core/use-cases/auth/auth-token.use-case';
import { TokenHandlerFactory } from '../adapters/token-handler.factory';

export abstract class AuthTokenFactory {
  private static _instance: AuthTokenUseCase;

  static instance(): AuthTokenUseCase {
    if (!AuthTokenFactory._instance) {
      AuthTokenFactory._instance = new AuthTokenUseCase({
        tokenHandler: TokenHandlerFactory.userToken(),
      });
    }

    return AuthTokenFactory._instance;
  }
}
