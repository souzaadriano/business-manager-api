import { timeConverterStrategies } from './strategies';
import { TTimeConverterType } from './strategies/time-converter-strategy.contract';

export class TimeConverter {
  private static _strategies = timeConverterStrategies;
  constructor(private readonly _input: TTimeConverterParameters) {}

  milliseconds(): number {
    return Object.entries(this._input).reduce((total, [key, value]) => {
      const converter = TimeConverter._strategies.get(key);
      return total + converter.milliseconds(value);
    }, 0);
  }

  seconds(): number {
    return Object.entries(this._input).reduce((total, [key, value]) => {
      const converter = TimeConverter._strategies.get(key);
      return total + converter.seconds(value);
    }, 0);
  }

  minutes(): number {
    return Object.entries(this._input).reduce((total, [key, value]) => {
      const converter = TimeConverter._strategies.get(key);
      return total + converter.minutes(value);
    }, 0);
  }

  hours(): number {
    return Object.entries(this._input).reduce((total, [key, value]) => {
      const converter = TimeConverter._strategies.get(key);
      return total + converter.hours(value);
    }, 0);
  }

  days(): number {
    return Object.entries(this._input).reduce((total, [key, value]) => {
      const converter = TimeConverter._strategies.get(key);
      return total + converter.days(value);
    }, 0);
  }
}

export type TTimeConverterParameters = {
  [TTimeConverterType.DAYS]?: number;
  [TTimeConverterType.HOURS]?: number;
  [TTimeConverterType.MINUTES]?: number;
  [TTimeConverterType.SECONDS]?: number;
  [TTimeConverterType.MILLISECONDS]?: number;
};
