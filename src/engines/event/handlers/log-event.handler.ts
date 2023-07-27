import { Singleton } from '@/helpers/singleton.decorator';
import { IEventHandler } from '../event-handler.contract';
import { EVENT_NAME } from '../event-name.enum';
import { EventEngine } from '../event.engine';

@Singleton
export class LogEventHandler implements IEventHandler<any> {
  private readonly _eventEngine = new EventEngine();

  eventName = EVENT_NAME.LOG;

  async send(message: any): Promise<void> {
    await this._eventEngine.emitAsync(this.eventName, message);
  }

  async handle(message: any): Promise<void> {
    console.log(message);
  }
}
