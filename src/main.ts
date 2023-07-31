import { Bootstrap } from './engines/bootstrap';
import { DatabaseEngine } from './engines/database/database.engine';
import { EventEngine } from './engines/event/event.engine';
import { NestEngine } from './engines/nest/nest.engine';
import { RedisEngine } from './engines/redis/redis.engine';

const application = Bootstrap.createApp([EventEngine, DatabaseEngine, RedisEngine, NestEngine]);

application.start().catch(console.error);
