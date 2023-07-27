import { LogHandler } from '@/core/adapters/handlers/log-handler/log-handler.adapter';
import { ILogHandler } from '@/core/adapters/handlers/log-handler/log-handler.contract';

export abstract class LogHandlerFactory {
  private static _instance: ILogHandler;

  static instance(): ILogHandler {
    if (!LogHandlerFactory._instance) {
      LogHandlerFactory._instance = new LogHandler();
    }

    return LogHandlerFactory._instance;
  }
}
