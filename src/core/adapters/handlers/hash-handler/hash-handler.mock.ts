import { Hash } from '@/core/domain/class/hash/hash.class';
import { Mock } from '@/helpers/mock/mock.factory';
import { IHashHandler } from './hash-handler.contract';

export const HashHandlerMock = Mock.factory<IHashHandler>();
HashHandlerMock.override('validate').resolve(true);
HashHandlerMock.override('generate').resolve(new Hash('test-hash', HashHandlerMock.get()));
