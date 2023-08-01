import { ITimeConverterStrategy, TTimeConverterType } from './time-converter-strategy.contract';

export class MinutesConverterStrategy implements ITimeConverterStrategy {
  kind: TTimeConverterType = TTimeConverterType.MINUTES;

  milliseconds(value: number): number {
    return value * 60 * 1000;
  }

  minutes(value: number): number {
    return value;
  }

  seconds(value: number): number {
    return value * 60;
  }

  hours(value: number): number {
    return value / 60;
  }

  days(value: number): number {
    return value / 60 / 24;
  }
}
