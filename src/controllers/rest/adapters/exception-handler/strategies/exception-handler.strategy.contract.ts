import { TRestError } from '../exception-handler.service';

export interface IRestExceptionHandlerStrategy<INPUT> {
  handle(error: INPUT): TRestError;
}

export enum REST_EXCEPTION_STRATEGY {
  EXCEPTION = 'EXCEPTION',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN',
}
