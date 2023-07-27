import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';

export class EmailAlreadyExistsException extends AbstractException {
  code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(email: string) {
    super(`Email ${email} already registed`);
    this._setDetails('email', email);
  }
}
