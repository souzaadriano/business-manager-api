import { IExceptionHandler } from '@/controllers/contracts/exception.handler.contract';
import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';
import { Injectable } from '@nestjs/common';
import { exceptionHandlerStrategies } from './strategies';
import { REST_EXCEPTION_STRATEGY } from './strategies/exception-handler.strategy.contract';

@Injectable()
export class RestExceptionHandler implements IExceptionHandler<TRestError> {
  private readonly _strategies = exceptionHandlerStrategies();

  handle(error: unknown): TRestError {
    const strategy = this._getStrategy(error);
    return strategy.handle(error);
  }

  private _shouldUse(error: unknown) {
    if (error instanceof AbstractException) return REST_EXCEPTION_STRATEGY.EXCEPTION;
    if (error instanceof Error) return REST_EXCEPTION_STRATEGY.ERROR;
    return REST_EXCEPTION_STRATEGY.UNKNOWN;
  }

  private _getStrategy(exception: unknown) {
    const strategy = this._strategies.get(this._shouldUse(exception));
    if (!strategy) throw new Error('strategy not found');
    return strategy;
  }
}

export type TRestError = {
  status: number;
  message: string;
  code: EXCEPTION_CODE;
};
