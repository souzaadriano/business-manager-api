import { DaysConverterStrategy } from './days.strategy';
import { HoursConverterStrategy } from './hours.strategy';
import { MillisecondsConverterStrategy } from './milliseconds.strategy';
import { MinutesConverterStrategy } from './minutes.strategy';
import { SecondsConverterStrategy } from './seconds.strategy';
import { ITimeConverterStrategy } from './time-converter-strategy.contract';

const daysConverterStrategy = new DaysConverterStrategy();
const hoursConverterStrategy = new HoursConverterStrategy();
const minutesConverterStrategy = new MinutesConverterStrategy();
const secondsConverterStrategy = new SecondsConverterStrategy();
const millisecondsConverterStrategy = new MillisecondsConverterStrategy();

export const timeConverterStrategies = new Map<string, ITimeConverterStrategy>([
  [daysConverterStrategy.kind, daysConverterStrategy],
  [hoursConverterStrategy.kind, hoursConverterStrategy],
  [minutesConverterStrategy.kind, minutesConverterStrategy],
  [secondsConverterStrategy.kind, secondsConverterStrategy],
  [millisecondsConverterStrategy.kind, millisecondsConverterStrategy],
]);
