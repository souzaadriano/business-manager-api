export interface ITimeConverterStrategy {
  readonly kind: TTimeConverterType;

  milliseconds(value: number): number;
  minutes(value: number): number;
  seconds(value: number): number;
  hours(value: number): number;
  days(value: number): number;
}

export enum TTimeConverterType {
  MILLISECONDS = 'milliseconds',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
  HOURS = 'hours',
  DAYS = 'days',
}
