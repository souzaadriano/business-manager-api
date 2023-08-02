import { SessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.adapter';
import { ISessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.contract';
import { RedisSessionAccessor } from '@/engines/redis/accessors/redis-session.accessor';
import { DateHandlerFactory } from './date-handler.factory';
import { GeneratorHandlerFactory } from './generator-handler.factory';
import { TokenHandlerFactory } from './token-handler.factory';

export abstract class SessionHandlerFactory {
  private static _instance: ISessionHandler;

  static instance(): ISessionHandler {
    if (!SessionHandlerFactory._instance) {
      SessionHandlerFactory._instance = new SessionHandler({
        accessor: new RedisSessionAccessor(),
        dateHandler: DateHandlerFactory.instance(),
        generator: GeneratorHandlerFactory.instance(),
        tokenHandler: TokenHandlerFactory.userToken(),
      });
    }

    return SessionHandlerFactory._instance;
  }
}
