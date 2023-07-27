import { UsersAccessor } from '@/engines/database/accessors';
import { mock } from 'jest-mock-extended';
import { Hash } from '../../../domain/class/hash/hash.class';
import { Uuid } from '../../../domain/class/uuid/uuid.class';
import { UserModel } from '../../../domain/entities/user/user.model';
import { IHashHandler } from '../../handlers/hash-handler/hash-handler.contract';
import { HashHandlerMock } from '../../handlers/hash-handler/hash-handler.mock';
import { UserRepository } from './user-repository.adapter';

describe('users-repository.adapter', () => {
  const usersAccessor: UsersAccessor = mock<UsersAccessor>();
  const hashHandler: IHashHandler = HashHandlerMock.get();
  const sut = new UserRepository({ usersAccessor, hashHandler });

  it('should be save user on databsae', async () => {
    await sut.save(
      UserModel.create({
        email: 'test@test.com',
        hash: new Hash('hash-test', hashHandler),
        id: new Uuid('uuid'),
        name: 'test',
      }),
    );

    expect(usersAccessor.createUser).toBeCalledTimes(1);
    expect(usersAccessor.createUser).toBeCalledWith({
      email: 'test@test.com',
      hash: 'hash-test',
      id: 'uuid',
      name: 'test',
    });
  });
});
