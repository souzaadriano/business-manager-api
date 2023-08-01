import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';

export class RedisCommandException extends AbstractException {
  code = EXCEPTION_CODE.REDIS;

  constructor(parameters: TRedisErrorParameters) {
    super(parameters.error instanceof Error ? parameters.error : `unknown redis error`);
    if (parameters.operation) this._setDetails('operation', parameters.operation);
    if (parameters.statement) this._setDetails('statement', parameters.statement);
    if (parameters.key) this._setDetails('key', parameters.key);
  }
}

type TRedisErrorParameters = {
  error: unknown;
  key?: string;
  operation?: REDIS_COMMAND;
  statement?: string;
};

export enum REDIS_COMMAND {
  GET = 'GET',
  SET = 'SET',
  SET_JSON = 'SET_JSON',
  GET_OBJECT = 'GET_OBJECT',
  TTL = 'TTL',
  DELETE = 'DELETE',
  SEARCH = 'SEARCH',
}
