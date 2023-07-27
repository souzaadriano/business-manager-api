import { HashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.adapter';
import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';

export abstract class HashHandlerFactory {
  private static _instance: IHashHandler;

  static instance(): IHashHandler {
    if (!HashHandlerFactory._instance) {
      HashHandlerFactory._instance = new HashHandler();
    }

    return HashHandlerFactory._instance;
  }
}
