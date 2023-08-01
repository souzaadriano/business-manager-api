import { Bootstrap } from '@/engines/bootstrap';
import { DatabaseConfig } from '@/engines/database/database.config';
import { DatabaseEngine } from '@/engines/database/database.engine';
import { seeds } from '@/engines/database/seeds';
import { EventEngine } from '@/engines/event/event.engine';
import { Clone } from '@/helpers/clone.helper';

const application = Bootstrap.createApp([EventEngine, DatabaseEngine]);

const seedsUp = async (purposes: Set<string>) => {
  for (const seed of seeds) {
    console.log(`seeding ${seed.name}`);
    purposes.has(seed.purpose) ? await seed.up() : console.log(`skiped: ${seed.name}`);
  }
};
const seedsDown = async (purposes: Set<string>) => {
  const reversed = seeds.map(Clone.simple).reverse();
  for (const seed of reversed) {
    console.log(`clearing ${seed.name}`);
    purposes.has(seed.purpose) ? await seed.down() : console.log(`skiped: ${seed.name}`);
  }
};

const main = async () => {
  await application.start();
  const config = new DatabaseConfig();
  const purposes = new Set(config.seedPurpose);

  console.log('\n\n==========================');
  console.log(`Seed purpose: ${config.seedPurpose.join(', ')}`);
  console.log('==========================');
  console.log('Clearing Database');
  console.log('==========================');
  await seedsDown(purposes);
  console.log('\nPopulating Database');
  console.log('==========================');
  await seedsUp(purposes);

  console.log('\n==========================');
  console.log('Seeds Ended');
};

main().catch(console.error);
