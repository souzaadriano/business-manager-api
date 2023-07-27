import { UserRepository } from '@/core/adapters/repositories/user-repository/user-repository.adapter';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { UsersAccessor } from '@/engines/database/accessors';
import { HashHandlerFactory } from '../adapters';

export class UserRepositoryFactory {
  private static _instance: IUserRepository;

  static instance(): IUserRepository {
    if (!UserRepositoryFactory._instance) {
      UserRepositoryFactory._instance = new UserRepository({
        usersAccessor: new UsersAccessor(),
        hashHandler: HashHandlerFactory.instance(),
      });
    }

    return UserRepositoryFactory._instance;
  }
}
