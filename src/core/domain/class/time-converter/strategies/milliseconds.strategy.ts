import { ITimeConverterStrategy, TTimeConverterType } from './time-converter-strategy.contract';

export class MillisecondsConverterStrategy implements ITimeConverterStrategy {
  kind: TTimeConverterType = TTimeConverterType.MILLISECONDS;

  milliseconds(value: number): number {
    return value;
  }

  minutes(value: number): number {
    return value * 1000 * 60;
  }

  seconds(value: number): number {
    return value * 1000;
  }

  hours(value: number): number {
    return value * 1000 * 60 * 60;
  }

  days(value: number): number {
    return value * 1000 * 60 * 60 * 24;
  }
}
