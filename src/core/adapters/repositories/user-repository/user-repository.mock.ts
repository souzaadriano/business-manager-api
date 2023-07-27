import { Mock } from '@/helpers/mock/mock.factory';
import { IUserRepository } from './user-repository.contract';

export const UserRepositoryMock = Mock.factory<IUserRepository>();
UserRepositoryMock.override('save').resolve(undefined);
UserRepositoryMock.override('findByEmail').resolve(undefined);
