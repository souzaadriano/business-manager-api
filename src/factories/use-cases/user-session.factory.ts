import { UserSessionUseCase } from '@/core/use-cases/user/user-session/user-session.use-case';
import { SessionHandlerFactory } from '../adapters/session-handler.factory';

export abstract class UserSessionFactory {
  private static _instance: UserSessionUseCase;

  static instance(): UserSessionUseCase {
    if (!UserSessionFactory._instance) {
      UserSessionFactory._instance = new UserSessionUseCase({
        sessionHandler: SessionHandlerFactory.instance(),
      });
    }

    return UserSessionFactory._instance;
  }
}
