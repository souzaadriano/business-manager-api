import { ClassConstructor } from 'class-transformer';
import { IEventHandler } from '../event-handler.contract';
import { LogEventHandler } from './log-event/log-event.handler';

export abstract class EventHandlersFactory {
  static handlers(): ClassConstructor<IEventHandler<any>>[] {
    return [LogEventHandler];
  }
}
