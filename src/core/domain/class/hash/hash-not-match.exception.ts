import { EXCEPTION_CODE } from '../../exception/exception-code.enum';
import { AbstractException } from '../../exception/exception.abstract';

export class HashNotMatchException extends AbstractException {
  constructor() {
    super('value not match');
  }
  readonly code = EXCEPTION_CODE.INVALID_INPUT;
}
