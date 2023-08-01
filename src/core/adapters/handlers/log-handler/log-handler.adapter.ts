import { Log } from '@/core/domain/class/log/log.class';
import { JsonDocument } from '@/core/domain/types/json-document.type';
import { LogEventHandler } from '@/engines/event/handlers/log-event/log-event.handler';
import { ILogHandler, TLogStep } from './log-handler.contract';

export class LogHandler implements ILogHandler {
  private readonly _eventHandler = new LogEventHandler();

  getLogger(context: string): Log {
    return new Log(context, this);
  }

  step(data: TLogStep): void {
    this._eventHandler.send({ kind: 'step', data });
  }

  finish(data: JsonDocument): void {
    this._eventHandler.send({ kind: 'finish', data });
  }
}

export type TLogFinishData = { kind: 'finish'; data: JsonDocument };
export type TLogStepData = { kind: 'step'; data: TLogStep };
export type TLogData = TLogFinishData | TLogStepData;
