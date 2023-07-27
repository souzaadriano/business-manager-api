import { EVENT_NAME } from './event-name.enum';

export interface IEventHandler<MESSAGE> {
  readonly eventName: EVENT_NAME;
  send(message: MESSAGE): Promise<void>;
  handle(message: MESSAGE): Promise<void>;
}
