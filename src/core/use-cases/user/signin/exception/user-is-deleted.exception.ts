import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';

export class UserIsDeletedException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;
  constructor(email: string) {
    super(`user ${email} is inactive`);

    this._setDetails('email', email);
  }
}
