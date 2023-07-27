import { Bootstrap } from './engines/bootstrap';
import { DatabaseEngine } from './engines/database/database.engine';
import { EventEngine } from './engines/event/event.engine';
import { NestEngine } from './engines/nest/nest.engine';

const application = Bootstrap.createApp([EventEngine, DatabaseEngine, NestEngine]);

application.start().catch(console.error);
