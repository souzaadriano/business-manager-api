import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { HttpStatus } from '@nestjs/common';
import { TRestError } from '../exception-handler.service';
import { IRestExceptionHandlerStrategy } from './exception-handler.strategy.contract';

export class UnknownHandlerStrategy implements IRestExceptionHandlerStrategy<unknown> {
  handle(error: unknown): TRestError {
    console.error(error);
    return { message: 'unexpected fail', status: HttpStatus.INTERNAL_SERVER_ERROR, code: EXCEPTION_CODE.UNKNOWN };
  }
}
