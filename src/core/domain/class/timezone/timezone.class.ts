import { InvalidTimezoneException } from './invalid-timezone.exception';
import { TIMEZONE } from './timezone.enum';

export class Timezone {
  private static readonly _timezones = new Set<string>(Object.values(TIMEZONE));
  private readonly _value: TIMEZONE;

  constructor(value: string) {
    this._value = this._validate(value);
  }

  get value(): TIMEZONE {
    return this._value;
  }

  private _validate(value: string): TIMEZONE {
    if (!Timezone._timezones.has(value)) throw new InvalidTimezoneException(value);
    return value as TIMEZONE;
  }
}
