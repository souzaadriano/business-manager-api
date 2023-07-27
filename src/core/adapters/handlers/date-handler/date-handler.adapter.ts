import { DateTime } from '@/core/domain/class/date-time/date-time.class';
import { Timezone } from '@/core/domain/class/timezone/timezone.class';
import {
  add,
  format,
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isAfter,
  isBefore,
  parse,
  sub,
} from 'date-fns';
import { IDateHandler } from './date-handler.contract';
import { DATE_FORMAT } from './date-handler.enum';
import { TDateCalculeValue, TDateObject, TStringDateObject } from './date-handler.type';

export class DateHandler implements IDateHandler {
  add(date: Date, value: TDateCalculeValue): Date {
    return add(date, value);
  }
  sub(date: Date, value: TDateCalculeValue): Date {
    return sub(date, value);
  }

  format(date: Date, dateFormat: DATE_FORMAT, timezone?: Timezone): string {
    return format(date, dateFormat);
  }

  parse(dateString: string, format: DATE_FORMAT, timezone?: Timezone): Date {
    return parse(dateString, format, new Date());
  }

  object(date: Date, format: 'string'): TStringDateObject;
  object(date: Date, format: 'number'): TDateObject;
  object(date: Date, format?: 'string' | 'number'): TDateObject | TStringDateObject {
    const props = this.dateAtributes(date);
    if (!format || format === 'number') return props;

    return {
      year: props.year.toString().padStart(2, '0'),
      month: props.month.toString().padStart(2, '0'),
      day: props.day.toString().padStart(2, '0'),
      hours: props.hours.toString().padStart(2, '0'),
      minutes: props.minutes.toString().padStart(2, '0'),
      seconds: props.seconds.toString().padStart(2, '0'),
      milliseconds: props.milliseconds.toString().padStart(2, '0'),
      unixTimestamp: props.unixTimestamp.toString().padStart(2, '0'),
    };
  }

  isAfter(date: Date, value: Date): boolean {
    return isAfter(date, value);
  }

  isBefore(date: Date, value: Date): boolean {
    return isBefore(date, value);
  }

  toDateTime(date: DateTime): DateTime;
  toDateTime(date: Date): DateTime;
  toDateTime(date: string, dateFormat: DATE_FORMAT): DateTime;
  toDateTime(date: Date | DateTime | string, dateFormat?: DATE_FORMAT): DateTime {
    if (date instanceof DateTime) return new DateTime(date.value, this);
    if (date instanceof Date) return new DateTime(date, this);
    if (typeof date === 'string') return new DateTime(parse(date, dateFormat, new Date()), this);
  }

  private dateAtributes(date: Date) {
    return {
      year: getYear(date),
      month: getMonth(date) + 1,
      day: getDate(date),
      hours: getHours(date),
      minutes: getMinutes(date),
      seconds: getSeconds(date),
      milliseconds: getMilliseconds(date),
      unixTimestamp: date.getTime(),
    };
  }
}
