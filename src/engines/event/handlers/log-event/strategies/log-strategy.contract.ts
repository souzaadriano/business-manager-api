import { LOG_STRATEGY } from '@/configurations/log-purpose.enum';
import { TLogFinishData } from '@/core/adapters/handlers/log-handler/log-handler.adapter';

export interface ILogStrategy {
  readonly purpose: LOG_STRATEGY;
  handle(input: TLogFinishData): Promise<void>;
}
