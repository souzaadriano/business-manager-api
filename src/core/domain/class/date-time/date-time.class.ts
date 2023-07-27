import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';
import { DATE_FORMAT } from '@/core/adapters/handlers/date-handler/date-handler.enum';
import { TDateCalculeValue } from '@/core/adapters/handlers/date-handler/date-handler.type';
import { Timestamp } from './timestamp.class';

export class DateTime {
  constructor(private _date: Date, private readonly _handler: IDateHandler) {}

  get value(): Date {
    return this._date;
  }

  static now(handler: IDateHandler): DateTime {
    return new DateTime(new Date(), handler);
  }

  timestamp() {
    return new Timestamp(this._date);
  }

  toString(dateFormat?: DATE_FORMAT): string {
    return this._handler.format(this._date, dateFormat);
  }

  add(value: TDateCalculeValue) {
    this._date = this._handler.add(this._date, value);
  }

  sub(value: TDateCalculeValue) {
    this._date = this._handler.sub(this._date, value);
  }

  isAfter(date: Date | DateTime) {
    return this._handler.isAfter(date instanceof DateTime ? date.value : date, this._date);
  }

  isBefore(date: Date | DateTime): boolean {
    return this._handler.isBefore(date instanceof DateTime ? date.value : date, this._date);
  }

  object() {
    return this._handler.object(this._date, 'number');
  }

  clone(): DateTime {
    return new DateTime(new Date(+this._date), this._handler);
  }
}
