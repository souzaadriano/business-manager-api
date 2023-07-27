import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';
import { HttpStatus } from '@nestjs/common';
import { TRestError } from '../exception-handler.service';
import { mappedExceptionCodes } from '../status-code.mapper';
import { IRestExceptionHandlerStrategy } from './exception-handler.strategy.contract';

export class ExcepitonHandlerStrategy implements IRestExceptionHandlerStrategy<AbstractException> {
  handle(error: AbstractException): TRestError {
    console.error(error);
    return { status: this._statusByCode(error.code), message: error.message, code: error.code };
  }

  private _statusByCode(code: EXCEPTION_CODE) {
    return mappedExceptionCodes.get(code) ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
