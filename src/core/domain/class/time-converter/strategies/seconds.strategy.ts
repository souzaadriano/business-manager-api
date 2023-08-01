import { ITimeConverterStrategy, TTimeConverterType } from './time-converter-strategy.contract';

export class SecondsConverterStrategy implements ITimeConverterStrategy {
  kind: TTimeConverterType = TTimeConverterType.SECONDS;

  milliseconds(value: number): number {
    return value * 1000;
  }

  minutes(value: number): number {
    return value / 60;
  }

  seconds(value: number): number {
    return value;
  }

  hours(value: number): number {
    return value / 60 / 60;
  }

  days(value: number): number {
    return value / 60 / 60 / 24;
  }
}
