import { UsersAccessor } from '@/engines/database/accessors';
import { mock } from 'jest-mock-extended';
import { Hash } from '../../../domain/class/hash/hash.class';
import { Uuid } from '../../../domain/class/uuid/uuid.class';
import { UserModel } from '../../../domain/entities/user/user.model';
import { IHashHandler } from '../../handlers/hash-handler/hash-handler.contract';
import { HashHandlerMock } from '../../handlers/hash-handler/hash-handler.mock';
import { UserRepository } from './user-repository.adapter';

describe('users-repository.adapter', () => {
  jest.useFakeTimers().setSystemTime(new Date('2023-07-27'));
  const userAccessor: UsersAccessor = mock<UsersAccessor>();
  const hashHandler: IHashHandler = HashHandlerMock.get();
  const sut = new UserRepository({ userAccessor, hashHandler });

  it('should be save user on databsae', async () => {
    const user = UserModel.create({
      email: 'test@test.com',
      hash: new Hash('hash-test', hashHandler),
      id: new Uuid('uuid'),
      name: 'test',
    });

    await sut.save(user);

    expect(userAccessor.createUser).toBeCalledTimes(1);
    expect(userAccessor.createUser).toBeCalledWith({
      email: 'test@test.com',
      hash: 'hash-test',
      id: 'uuid',
      name: 'test',
      createdAt: new Date('2023-07-27'),
      updatedAt: new Date('2023-07-27'),
      deletedAt: null,
    });
  });
});
