import { DateTime } from '@/core/domain/class/date-time/date-time.class';
import { Timezone } from '@/core/domain/class/timezone/timezone.class';
import { DATE_FORMAT } from './date-handler.enum';
import { TDateCalculeValue, TDateObject, TStringDateObject } from './date-handler.type';

export interface IDateHandler {
  add(date: Date, value: TDateCalculeValue): Date;
  sub(date: Date, value: TDateCalculeValue): Date;
  format(date: Date, format: DATE_FORMAT, timezone?: Timezone): string;
  parse(dateString: string, format: DATE_FORMAT, timezone?: Timezone): Date;

  object(date: Date, format: 'string'): TStringDateObject;
  object(date: Date, format: 'number'): TDateObject;
  object(date: Date, format: 'string' | 'number'): TDateObject | TStringDateObject;

  isAfter(date: Date, value: Date): boolean;
  isBefore(date: Date, value: Date): boolean;

  toDateTime(date: DateTime): DateTime;
  toDateTime(date: Date): DateTime;
  toDateTime(date: string, dateFormat: DATE_FORMAT): DateTime;
  toDateTime(date: Date | DateTime | string, dateFormat?: DATE_FORMAT): DateTime;
}
