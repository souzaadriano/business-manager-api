import { Bootstrap } from '@/engines/bootstrap';
import { DatabaseEngine } from '@/engines/database/database.engine';
import { seeds } from '@/engines/database/seeds';
import { EventEngine } from '@/engines/event/event.engine';

const application = Bootstrap.createApp([EventEngine, DatabaseEngine]);

const seedsUp = async () => {
  for (const seed of seeds) {
    console.log(`seeding ${seed.name}`);
    await seed.up();
  }
};
const seedsDown = async () => {
  for (const seed of seeds.reverse()) {
    console.log(`clearing ${seed.name}`);
    await seed.down();
  }
};

const main = async () => {
  await application.start();
  console.log('Clearing Database');
  console.log('==========================');
  await seedsDown();
  console.log('\nPopulating Database');
  console.log('==========================');
  await seedsUp();

  console.log('\n==========================');
  console.log('Seeds Ended');
};

main().catch(console.error);
