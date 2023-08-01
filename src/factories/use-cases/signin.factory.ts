import { SigninUseCase } from '@/core/use-cases/user/signin/signin.use-case';
import { HashHandlerFactory } from '../adapters';
import { SessionHandlerFactory } from '../adapters/session-handler.factory';
import { UserRepositoryFactory } from '../repositories';

export abstract class SigninFactory {
  private static _instance: SigninUseCase;

  static instance(): SigninUseCase {
    if (!SigninFactory._instance) {
      SigninFactory._instance = new SigninUseCase({
        hashHandler: HashHandlerFactory.instance(),
        userRepository: UserRepositoryFactory.instance(),
        sessionHandler: SessionHandlerFactory.instance(),
      });
    }

    return SigninFactory._instance;
  }
}
