import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';

export class DatabaseException extends AbstractException {
  code = EXCEPTION_CODE.DATABASE;

  constructor(parameters: TDatabaseErrorParameters) {
    super(parameters.error instanceof Error ? parameters.error : `unknown database error`);
    if (parameters.operation) this._setDetails('operation', parameters.operation);
    if (parameters.statement) this._setDetails('statement', parameters.statement);
  }
}

type TDatabaseErrorParameters = {
  error: unknown;
  operation?: DATABASE_OPERATION;
  statement?: string;
};

export enum DATABASE_OPERATION {
  INSERT = 'INSERT',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  SELECT = 'SELECT',
}
