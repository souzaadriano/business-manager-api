import { LOG_STRATEGY } from '@/configurations/log-purpose.enum';
import { LogConfig } from '@/configurations/log.config';
import { DATE_FORMAT } from '@/core/adapters/handlers/date-handler/date-handler.enum';
import { TLogFinishData } from '@/core/adapters/handlers/log-handler/log-handler.adapter';
import { format } from 'date-fns';
import { appendFile } from 'fs/promises';
import { ILogStrategy } from './log-strategy.contract';

export class AppendLogToFile implements ILogStrategy {
  private readonly _configuration = new LogConfig();
  purpose = LOG_STRATEGY.APPEND_FILE;

  async handle(input: TLogFinishData): Promise<void> {
    const { path, time } = this._makeName();
    const dataToSave = JSON.stringify(input.data);
    await appendFile(path, `"${time}": ${dataToSave},\n`);
  }

  private _makeName() {
    const [date, time] = format(new Date(), DATE_FORMAT.STANDARD).split(' ');
    return { path: `${this._configuration.filePath}/${date}.log`, time };
  }
}
