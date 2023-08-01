import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { AbstractException } from '@/core/domain/exception/exception.abstract';

export class UserNotFoundException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;
  constructor(email: string) {
    super(`wrong email/password`);

    this._setDetails('email', email);
    this._setReason(`user not found for email ${email}`);
  }
}
