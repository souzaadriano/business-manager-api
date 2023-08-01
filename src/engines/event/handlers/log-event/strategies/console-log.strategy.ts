import { LOG_STRATEGY } from '@/configurations/log-purpose.enum';
import { TLogFinishData } from '@/core/adapters/handlers/log-handler/log-handler.adapter';
import { ILogStrategy } from './log-strategy.contract';

export class ConsoleLogStrategy implements ILogStrategy {
  purpose = LOG_STRATEGY.CONSOLE;

  async handle(input: TLogFinishData): Promise<void> {
    console.log(input);
  }
}
