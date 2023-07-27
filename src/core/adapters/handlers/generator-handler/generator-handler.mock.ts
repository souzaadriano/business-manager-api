import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { Mock } from '@/helpers/mock/mock.factory';
import { IGeneratorHandler } from './generator-handler.contract';

export const FAKE_UUID = '00000000-0000-4000-0000-000000000000';
export const GeneratorHandlerMock = Mock.factory<IGeneratorHandler>();
GeneratorHandlerMock.override('uuid').return(new Uuid(FAKE_UUID));
