import { DATE_FORMAT } from '@/core/adapters/handlers/date-handler/date-handler.enum';
import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';
import { ILogHandler } from '@/core/adapters/handlers/log-handler/log-handler.contract';
import { ISessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.contract';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { Email } from '@/core/domain/class/email/email.class';
import { UserModel } from '@/core/domain/entities/user/user.model';
import { AbstractUseCase } from '../../use-case.abstract';
import { UserIsDeletedException } from './exception/user-is-deleted.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';

export class SigninUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Output> {
    const { logHandler } = this._dependencies;
    const logger = logHandler.getLogger('SigninUseCase');
    try {
      logger.step('input', input);
      const { email, password } = input;
      const user = await this._getUser(email);
      logger.step('user_id', user.id);
      logger.step('validate_user_password');
      await user.hash.match(password);
      logger.step('is_valid_password', true);
      const session = await this._createSession(user);
      logger.step('session', {
        id: session.id,
        eat: session.expireAt.toString(DATE_FORMAT.STANDARD),
        iat: session.issuedAt.toString(DATE_FORMAT.STANDARD),
      });
      const { token } = await session.token();
      logger.step('session_token', token);
      logger.finish();
      return { token, email: user.email, name: user.name, id: user.id };
    } catch (error) {
      logger.fail(error);
      throw error;
    }
  }

  private async _createSession(user: UserModel) {
    const { sessionHandler } = this._dependencies;
    const permissions = await this._getPermissions(user);
    return await sessionHandler.create({ user, permissions });
  }

  private async _getUser(input: string) {
    const { userRepository } = this._dependencies;
    const email = Email.create(input);

    const user = await userRepository.findByEmail(email);
    if (user && !user.deletedAt) return user;
    if (user.deletedAt) throw new UserIsDeletedException(email.value);
    throw new UserNotFoundException(email.value);
  }

  private async _getPermissions(user: UserModel) {
    const { userRepository } = this._dependencies;
    return await userRepository.getPermissions(user);
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
  logHandler: ILogHandler;
};
