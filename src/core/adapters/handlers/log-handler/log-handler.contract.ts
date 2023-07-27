import { Timestamp } from '@/core/domain/class/date-time/timestamp.class';
import { Log } from '@/core/domain/class/log/log.class';
import { JsonDocument, JsonValue } from '@/core/domain/types/json-document.type';

export interface ILogHandler {
  getLogger(context: string): Log;
  step(step: TLogStep): void;
  finish(data: JsonDocument): void;
}

export type TLogStep = {
  key: string;
  value: JsonValue;
  context: string;
  issuedAt: Timestamp;
  elapsed: number;
};
