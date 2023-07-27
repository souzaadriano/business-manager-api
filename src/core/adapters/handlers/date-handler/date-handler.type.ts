import { DATE_CHUNK } from './date-handler.enum';

export type TDateObject = {
  unixTimestamp: number;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type TStringDateObject = {
  unixTimestamp: string;
  year: string;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
};

export type TDateCalculeValue = {
  [DATE_CHUNK.MILLISECONDS]?: number;
  [DATE_CHUNK.SECONDS]?: number;
  [DATE_CHUNK.MINUTES]?: number;
  [DATE_CHUNK.HOURS]?: number;
  [DATE_CHUNK.DAYS]?: number;
  [DATE_CHUNK.WEEKS]?: number;
  [DATE_CHUNK.MONTHS]?: number;
  [DATE_CHUNK.YEARS]?: number;
};
