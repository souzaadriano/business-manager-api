import { ITimeConverterStrategy, TTimeConverterType } from './time-converter-strategy.contract';

export class HoursConverterStrategy implements ITimeConverterStrategy {
  kind: TTimeConverterType = TTimeConverterType.HOURS;

  milliseconds(value: number): number {
    return value * 60 * 60 * 1000;
  }

  minutes(value: number): number {
    return value * 60;
  }

  seconds(value: number): number {
    return value * 60 * 60;
  }

  hours(value: number): number {
    return value;
  }

  days(value: number): number {
    return value / 24;
  }
}
