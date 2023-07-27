import { EXCEPTION_CODE } from '../exception-code.enum';
import { AbstractException } from '../exception.abstract';

export class UpgradedException extends AbstractException {
  constructor(error: unknown) {
    super(error instanceof Error ? error : 'Unknown error');
  }
  code = EXCEPTION_CODE.UNKNOWN;
}
