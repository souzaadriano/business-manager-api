import { AbstractConfiguration, Environment, Singleton, ToStringArray } from 'environment-variables-decorator';
import { LOG_PURPOSE, LOG_STRATEGY } from './log-purpose.enum';

@Singleton
export class LogConfig extends AbstractConfiguration {
  @ToStringArray({ splitBy: '|' })
  @Environment('LOG_PURPOSE', [LOG_PURPOSE.FINISH])
  purpose: string[];

  @ToStringArray({ splitBy: '|' })
  @Environment('LOG_STRATEGY', [LOG_STRATEGY.CONSOLE])
  strategy: string[];

  @Environment('LOG_PATH', './logs')
  filePath: string;
}
