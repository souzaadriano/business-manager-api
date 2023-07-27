import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { HttpStatus } from '@nestjs/common';
import { TRestError } from '../exception-handler.service';
import { IRestExceptionHandlerStrategy } from './exception-handler.strategy.contract';

export class ErrorHandlerStrategy implements IRestExceptionHandlerStrategy<Error> {
  handle(error: Error): TRestError {
    console.error(error);
    return { status: HttpStatus.INTERNAL_SERVER_ERROR, code: EXCEPTION_CODE.UNKNOWN, message: 'Unexpected Error' };
  }
}
