import { GeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.adapter';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';

export abstract class GeneratorHandlerFactory {
  private static _instance: IGeneratorHandler;

  static instance(): IGeneratorHandler {
    if (!GeneratorHandlerFactory._instance) {
      GeneratorHandlerFactory._instance = new GeneratorHandler();
    }

    return GeneratorHandlerFactory._instance;
  }
}
