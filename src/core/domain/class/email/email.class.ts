import { InvalidInputException } from '../../exception/shared/invalid-input.exception';

export class Email {
  private static readonly _validate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  constructor(private readonly _value: string) {}

  static create(value: string): Email {
    if (Email._validate.test(value)) return new Email(value);
    throw new InvalidInputException(`${value} is a invalid email`, { value });
  }

  get value(): string {
    return this._value;
  }
}
