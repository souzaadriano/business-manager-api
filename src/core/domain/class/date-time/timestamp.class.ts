export class Timestamp {
  private readonly _date: Date;
  private readonly _value: number;
  constructor(value: number | Date) {
    if (value instanceof Date) this._value = +value;
    this._date = new Date(this._value);
  }

  static now() {
    return new Timestamp(new Date());
  }

  get date(): Date {
    return this._date;
  }

  get value(): number {
    return this._value;
  }

  get valueInSeconds(): number {
    return this._value / 1000;
  }
}
