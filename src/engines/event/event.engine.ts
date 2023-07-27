import { Singleton } from '@/helpers/singleton.decorator';
import { EventEmitter2 } from 'eventemitter2';
import { IEngine } from '../engine.contract';
import { EventHandlersFactory } from './handlers';

@Singleton
export class EventEngine implements IEngine {
  private _eventEngine: EventEmitter2;
  private _handlers = EventHandlersFactory.handlers();

  async init(): Promise<void> {
    if (this._eventEngine) return;
    this._eventEngine = new EventEmitter2();
    this._listenHandlers();
  }

  emit(eventName: string, ...data: any[]) {
    this._eventEngine.emit(eventName, ...data);
  }

  async emitAsync(eventName: string, ...data: any[]) {
    await this._eventEngine.emitAsync(eventName, ...data);
  }

  private _listenHandlers() {
    for (const Handler of this._handlers) {
      const handler = new Handler();
      console.log(`[${EventEngine.name}]: Started event ${handler.eventName}`);

      this._eventEngine.on(handler.eventName, (message: any) => {
        handler
          .handle(message)
          .then(() => undefined)
          .catch((error) => console.error(`Failed on handling event form ${handler.eventName}`, error));
      });
    }
  }
}
