import { seeds } from '@/engines/database/seeds';

const seedsUp = async () => {
  for (const seed of seeds) await seed.up();
};
const seedsDown = async () => {
  for (const seed of seeds.reverse()) await seed.down();
};

const main = async () => {
  await seedsDown();
  await seedsUp();
};

main().catch(console.error);
