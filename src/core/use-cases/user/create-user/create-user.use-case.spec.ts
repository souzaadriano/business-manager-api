import { DateHandler } from '@/core/adapters/handlers/date-handler/date-handler.adapter';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { FAKE_UUID, GeneratorHandlerMock } from '@/core/adapters/handlers/generator-handler/generator-handler.mock';
import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';
import { HashHandlerMock } from '@/core/adapters/handlers/hash-handler/hash-handler.mock';
import { ILogHandler } from '@/core/adapters/handlers/log-handler/log-handler.contract';
import { LogHandlerMock } from '@/core/adapters/handlers/log-handler/log-handler.mock';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { UserRepositoryMock } from '@/core/adapters/repositories/user-repository/user-repository.mock';
import { CreateUserUseCase } from './create-user.use-case';
import { EmailAlreadyExistsException } from './exception/email-already-exists.exception';

describe('create-user.use-case', () => {
  let sut: CreateUserUseCase;
  const generatorHandler: IGeneratorHandler = GeneratorHandlerMock.get();
  const hashHandler: IHashHandler = HashHandlerMock.get();
  const userRepository: IUserRepository = UserRepositoryMock.get();
  const logHandler: ILogHandler = LogHandlerMock.get();
  const dateHandler: DateHandler = new DateHandler();

  beforeAll(() => {
    sut = new CreateUserUseCase({
      generatorHandler,
      hashHandler,
      userRepository,
      dateHandler,
      logHandler,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be create user and save at repository', async () => {
    const result = await sut.execute({
      email: 'test@email.com.br',
      name: 'teste',
      password: 'password1234',
    });

    expect(result.id).toBe(FAKE_UUID);
    expect(generatorHandler.uuid).toBeCalledTimes(1);
    expect(hashHandler.generate).toBeCalledTimes(1);
    expect(userRepository.save).toBeCalledTimes(1);
    expect(logHandler.step).toBeCalledTimes(3);
  });

  it('should throw an error Because user already exists', async () => {
    UserRepositoryMock.override('findByEmail').resolve({});
    const promise = sut.execute({
      email: 'test@email.com.br',
      name: 'teste',
      password: 'password1234',
    });
    await expect(promise).rejects.toThrow(EmailAlreadyExistsException);
  });
});
