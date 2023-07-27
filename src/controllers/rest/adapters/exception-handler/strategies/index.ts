import { IRestExceptionHandlerStrategy, REST_EXCEPTION_STRATEGY } from './exception-handler.strategy.contract';
import { ErrorHandlerStrategy } from './rest-error.strategy';
import { ExcepitonHandlerStrategy } from './rest-exception.strategy';
import { UnknownHandlerStrategy } from './rest-unknown.strategy';

export const exceptionHandlerStrategies = () =>
  new Map<REST_EXCEPTION_STRATEGY, IRestExceptionHandlerStrategy<any>>([
    [REST_EXCEPTION_STRATEGY.EXCEPTION, new ExcepitonHandlerStrategy()],
    [REST_EXCEPTION_STRATEGY.ERROR, new ErrorHandlerStrategy()],
    [REST_EXCEPTION_STRATEGY.UNKNOWN, new UnknownHandlerStrategy()],
  ]);
