import { AppendLogToFile } from './append-log-file.strategy';
import { ConsoleLogStrategy } from './console-log.strategy';
import { ILogStrategy } from './log-strategy.contract';

export const getLogStrategies = (): ILogStrategy[] => [new ConsoleLogStrategy(), new AppendLogToFile()];
