import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';
import { ISessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.contract';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { Email } from '@/core/domain/class/email/email.class';
import { UserModel } from '@/core/domain/entities/user/user.model';
import { AbstractUseCase } from '../../use-case.abstract';

export class SigninUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Output> {
    const { email, password } = input;
    const user = await this._getUser(email);
    await user.hash.match(password);
    const session = await this._createSession(user);
    const { token } = await session.token();
    return { token, email: user.email, name: user.name, id: user.id };
  }

  private async _createSession(user: UserModel) {
    const { sessionHandler } = this._dependencies;
    const { permissions, storeIds } = await this._getPermissions(user);
    return await sessionHandler.create({ user, permissions, storeIds });
  }

  private async _getUser(input: string) {
    const { userRepository } = this._dependencies;
    const email = Email.create(input);

    const user = await userRepository.findByEmail(email);
    if (user) return user;

    throw new Error();
  }

  private async _getPermissions(user: UserModel) {
    const { userRepository } = this._dependencies;
    const permissions = await userRepository.findPermissions(user.id);
    const storeIds = await userRepository.findStores(user.id);

    return { permissions, storeIds };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = { token: string; name: string; email: string; id: string };

type Dependencies = {
  userRepository: IUserRepository;
  hashHandler: IHashHandler;
  sessionHandler: ISessionHandler;
};
