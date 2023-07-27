import { CreateUserUseCase } from '@/core/use-cases/user/create-user/create-user.use-case';
import { DateHandlerFactory, GeneratorHandlerFactory, HashHandlerFactory, LogHandlerFactory } from '../adapters';
import { UserRepositoryFactory } from '../repositories';

export abstract class CreateUserFactory {
  private static _instance: CreateUserUseCase;

  static instance(): CreateUserUseCase {
    if (!CreateUserFactory._instance) {
      CreateUserFactory._instance = new CreateUserUseCase({
        generatorHandler: GeneratorHandlerFactory.instance(),
        hashHandler: HashHandlerFactory.instance(),
        userRepository: UserRepositoryFactory.instance(),
        dateHandler: DateHandlerFactory.instance(),
        logHandler: LogHandlerFactory.instance(),
      });
    }

    return CreateUserFactory._instance;
  }
}
