import { JsonValue } from '../../types/json-document.type';
import { EXCEPTION_CODE } from '../exception-code.enum';
import { AbstractException } from '../exception.abstract';

export class InvalidInputException extends AbstractException {
  code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(message: string, details?: Record<string, JsonValue>) {
    super(message);
    for (const key in details) this._setDetails(key, details[key]);
  }
}
