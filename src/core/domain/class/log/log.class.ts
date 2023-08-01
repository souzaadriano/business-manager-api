import { ILogHandler } from '@/core/adapters/handlers/log-handler/log-handler.contract';
import { EXCEPTION_CODE } from '../../exception/exception-code.enum';
import { AbstractException } from '../../exception/exception.abstract';
import { JsonDocument, JsonValue } from '../../types/json-document.type';
import { Timestamp } from '../date-time/timestamp.class';
import { Pid } from '../pid/pid.class';
import { Stopwatch } from '../stopwatch/stopwatch.class';

export class Log {
  private readonly _pid: Pid;
  private readonly _handler: ILogHandler;
  private readonly _data = new Map<string, JsonValue>();
  private readonly _stopwatch: Stopwatch;

  constructor(context: string, handler: ILogHandler) {
    this._pid = Pid.create(context);
    this._stopwatch = new Stopwatch(context);
    this._handler = handler;
    this._stopwatch.start();
    this._data.set('startedAt', this._stopwatch.startedAt.value);
  }

  get context() {
    return this._pid.context;
  }

  get pid() {
    return this._pid.value;
  }

  step(key: string, value?: JsonValue) {
    const elapsed = this._stopwatch.step(key);
    const data = value ?? `elapsed time ${elapsed}`;
    this._data.set(key, data);
    this._handler.step({ context: this.context, issuedAt: Timestamp.now(), key, value: data, elapsed });
  }

  finish(data?: JsonValue) {
    this._data.set('finish', data);
    this._stopwatch.stop();
    this._setStopwatchTimers();
    this._handler.finish(this._getDataObject());
  }

  fail(error: unknown) {
    this._stopwatch.stop();
    this._setStopwatchTimers();

    if (error instanceof AbstractException) {
      this._data.set('error', error.toObject());
      this._handler.finish(this._getDataObject());
      return;
    }

    if (error instanceof Error) {
      this._data.set('error', this._detailedError(error));
      this._handler.finish(this._getDataObject());
      return;
    }

    this._data.set('error', error as any);
    this._handler.finish(this._getDataObject());
  }

  private _setStopwatchTimers() {
    const { elapsedTime, steps } = this._stopwatch.getResult();
    this._data.set('totalElapsedTime', elapsedTime);
    this._data.set('stepTimers', steps);
  }

  private _getDataObject(): JsonDocument {
    return Object.fromEntries(this._data.entries());
  }

  private _detailedError(error: Error) {
    return {
      isUpgraded: true,
      details: { cause: error.cause as any },
      name: error.name,
      code: EXCEPTION_CODE.UNKNOWN,
      message: error.message,
      stack: error.stack ?? 'not found stack',
    };
  }
}
