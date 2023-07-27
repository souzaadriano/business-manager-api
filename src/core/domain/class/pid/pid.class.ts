import { Timestamp } from '../date-time/timestamp.class';
import { Uuid } from '../uuid/uuid.class';

export class Pid {
  private readonly _uuid: Uuid;
  private readonly _timestamp: Timestamp;
  private readonly _context: string;

  constructor(parameters: TPidParameters) {
    this._context = parameters.context;
    this._uuid = parameters.uuid;
    this._timestamp = parameters.timestamp;
  }

  static parse(pid: string): Pid {
    return new Pid(Pid._unpack(pid));
  }

  static create(context: string): Pid {
    return new Pid({
      timestamp: Timestamp.now(),
      context,
      uuid: Uuid.generate(),
    });
  }

  private static _unpack(pid: string): TPidParameters {
    const [timestamp, context, uniqueId] = pid.split(':');
    const uuid = Uuid.create(uniqueId);

    return { timestamp: new Timestamp(Number(timestamp)), uuid, context };
  }

  get value(): string {
    return `${this._timestamp.value}:${this._context}:${this._uuid.value}`;
  }

  get uuid(): string {
    return this._uuid.value;
  }

  get timestamp(): number {
    return this._timestamp.value;
  }

  get context(): string {
    return this._context;
  }
}

export type TPidParameters = {
  timestamp: Timestamp;
  context: string;
  uuid: Uuid;
};
