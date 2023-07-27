import { IHashHandler } from '@/core/adapters/handlers/hash-handler/hash-handler.contract';
import { HashNotMatchException } from './hash-not-match.exception';

export class Hash {
  constructor(private readonly _value: string, private readonly _handler: IHashHandler) {}

  async match(value: string): Promise<void> {
    const isValid = !(await this._handler.validate(this, value));
    if (!isValid) throw new HashNotMatchException();
  }

  get value(): string {
    return this._value;
  }
}
