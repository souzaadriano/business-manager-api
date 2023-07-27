import { Log } from '@/core/domain/class/log/log.class';
import { Mock } from '@/helpers/mock/mock.factory';
import { ILogHandler } from './log-handler.contract';

export const LogHandlerMock = Mock.factory<ILogHandler>();
const getLoggerMockedImplementation = (context: string) => new Log(context, LogHandlerMock.get());
LogHandlerMock.override('getLogger').implement(getLoggerMockedImplementation);
LogHandlerMock.override('finish').return(undefined);
LogHandlerMock.override('step').return(undefined);
