import { LOG_PURPOSE } from '@/configurations/log-purpose.enum';
import { LogConfig } from '@/configurations/log.config';
import { TLogData, TLogFinishData, TLogStepData } from '@/core/adapters/handlers/log-handler/log-handler.adapter';
import { Singleton } from '@/helpers/singleton.decorator';
import { IEventHandler } from '../../event-handler.contract';
import { EVENT_NAME } from '../../event-name.enum';
import { EventEngine } from '../../event.engine';
import { getLogStrategies } from './strategies';

@Singleton
export class LogEventHandler implements IEventHandler<TLogData> {
  private readonly _eventEngine = new EventEngine();
  private readonly _configuration = new LogConfig();
  private readonly _purposes = new Set<string>(this._configuration.purpose);
  private readonly _strategy_purpose = new Set<string>(this._configuration.strategy);
  private readonly _strategies = getLogStrategies();

  eventName = EVENT_NAME.LOG;

  async send(message: TLogData): Promise<void> {
    await this._eventEngine.emitAsync(this.eventName, message);
  }

  async handle(message: TLogData): Promise<void> {
    try {
      if (message.kind === 'step') return await this._handleStep(message);
      if (message.kind === 'finish' && message.data['error']) return await this._handleError(message);
      return await this._handleFinish(message);
    } catch (error) {
      console.error('ERROR ON HANDLE LOG', message);
      console.error(error);
    }
  }

  private async _handleFinish(data: TLogFinishData) {
    if (!this._purposes.has(LOG_PURPOSE.FINISH)) return;
    await this._executeStrategy(data);
  }

  private async _handleError(data: TLogFinishData) {
    if (!this._purposes.has(LOG_PURPOSE.ERROR)) return;

    this._executeStrategy(data);
  }

  private async _handleStep(data: TLogStepData) {
    if (!this._purposes.has(LOG_PURPOSE.STEP)) return;
    console.log('[LOG_STEP]', data);
  }

  private async _executeStrategy(data: TLogFinishData) {
    const strategiesPromisses: Promise<void>[] = [];
    for (const strategy of this._strategies) {
      if (!this._strategy_purpose.has(strategy.purpose)) return;
      strategiesPromisses.push(strategy.handle(data));
    }

    await Promise.all(strategiesPromisses);
  }
}
