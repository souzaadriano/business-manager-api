import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';
import { DATE_FORMAT } from '@/core/adapters/handlers/date-handler/date-handler.enum';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';
import { ILogHandler } from '@/core/adapters/handlers/log-handler/log-handler.contract';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { Email } from '@/core/domain/class/email/email.class';
import { Log } from '@/core/domain/class/log/log.class';
import { UserModel } from '@/core/domain/entities/user/user.model';
import { AbstractUseCase } from '../../use-case.abstract';
import { EmailAlreadyExistsException } from './exception/email-already-exists.exception';

export class CreateUserUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Output> {
    const { userRepository, logHandler, dateHandler } = this._dependencies;
    const logger = logHandler.getLogger('CreateUserUseCase');
    try {
      const user = await this._createUser(input, logger);

      logger.step('validateEmail', user.email);
      await this._emailNotRegistred(user);

      logger.step('saveUser', user.id);
      await userRepository.save(user);

      const output = {
        id: user.id,
        email: user.email,
        createdAt: dateHandler.format(user.createdAt, DATE_FORMAT.STANDARD),
      };

      logger.finish();
      return {
        id: user.id,
        email: user.email,
        createdAt: dateHandler.format(user.createdAt, DATE_FORMAT.STANDARD),
      };
    } catch (error) {
      logger.fail(error);
      throw error;
    }
  }

  private async _emailNotRegistred(user: UserModel) {
    const { userRepository } = this._dependencies;
    const founded = await userRepository.findByEmail(new Email(user.email));
    if (founded) throw new EmailAlreadyExistsException(user.email);
  }

  private async _createUser(input: Input, logger: Log): Promise<UserModel> {
    const { email, name, password } = input;
    const { generatorHandler, hashHandler } = this._dependencies;
    const userId = generatorHandler.uuid();
    logger.step('generate hash');
    const hash = await hashHandler.generate(password);
    const user = UserModel.create({
      email,
      hash,
      id: userId,
      name: name,
    });

    return user;
  }
}

type Dependencies = {
  userRepository: IUserRepository;
  hashHandler: IHashHandler;
  generatorHandler: IGeneratorHandler;
  logHandler: ILogHandler;
  dateHandler: IDateHandler;
};

export type Input = {
  name: string;
  email: string;
  password: string;
};

export type Output = {
  email: string;
  id: string;
  createdAt: string;
};
