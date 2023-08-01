import { ITimeConverterStrategy, TTimeConverterType } from './time-converter-strategy.contract';

export class DaysConverterStrategy implements ITimeConverterStrategy {
  kind: TTimeConverterType = TTimeConverterType.DAYS;

  milliseconds(value: number): number {
    return value * 24 * 60 * 60 * 1000;
  }

  minutes(value: number): number {
    return value * 24 * 60;
  }

  seconds(value: number): number {
    return value * 24 * 60 * 60;
  }

  hours(value: number): number {
    return value * 24;
  }

  days(value: number): number {
    return value;
  }
}
