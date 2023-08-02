import { CreateStoreUseCase } from '@/core/use-cases/store/create-store/create-store.use-case';
import { DateHandlerFactory, GeneratorHandlerFactory } from '../adapters';
import { UserRepositoryFactory } from '../repositories';
import { StoreRepositoryFactory } from '../repositories/store-repository.factory';

export abstract class CreateStoreFactory {
  private static _instance: CreateStoreUseCase;

  static instance(): CreateStoreUseCase {
    if (!CreateStoreFactory._instance) {
      CreateStoreFactory._instance = new CreateStoreUseCase({
        dateHandler: DateHandlerFactory.instance(),
        generatorHandler: GeneratorHandlerFactory.instance(),
        userRepository: UserRepositoryFactory.instance(),
        storeRepository: StoreRepositoryFactory.instance(),
      });
    }

    return CreateStoreFactory._instance;
  }
}
