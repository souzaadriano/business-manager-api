import { HashHandlerFactory } from '@/factories/adapters';
import { UsersAccessor } from '../../accessors';
import { AbstractSeed, SEED_PURPOSE } from '../seed.abstract';
import { USER_NAMES } from './user-names.constants';

export class UsersSeed extends AbstractSeed {
  private readonly _userAccessor = new UsersAccessor();
  private readonly _hashHandler = HashHandlerFactory.instance();

  readonly purpose = SEED_PURPOSE.DEVELOPMENT_POPULATE;
  readonly name = 'users';

  async up(): Promise<void> {
    const users = await this.generateUserInputs();
    const filteredUsers = await this._filterExistentUsers(users);
    for (const user of filteredUsers) await this._userAccessor.createUser(user);

    console.log(`Created ${users.length} users`);
  }

  async down(): Promise<void> {
    const users = await this._getCurrentUsers();
    await this._userAccessor.hardDeleterAllUsersNotInParams({ ids: users.map((u) => u.id) });
  }

  private async _filterExistentUsers(users: TUsersToInsert[]) {
    const current = await this._getCurrentUsers();
    const currentSet = new Set(current.map((user) => user.email));
    return users.filter((user) => !currentSet.has(user.email));
  }

  private async _getCurrentUsers() {
    const emails = USER_NAMES.map((user) => this._makeEmailByName(user.first, user.last));
    console.log(emails);
    return await this._userAccessor.findManyByEmail({ emails });
  }

  private async generateUserInputs() {
    const hash = await this._hashHandler.generate('test1234');
    return USER_NAMES.map(({ first, last, deleted }) => ({
      createdAt: this._date,
      updatedAt: this._date,
      deletedAt: deleted ? this._deletedAt : null,
      email: this._makeEmailByName(first, last),
      hash: hash.value,
      id: this._generatorHandler.uuid().value,
      name: `${first} ${last}`,
    }));
  }

  private _makeEmailByName(first: string, last: string) {
    return `${first}.${last}@test.com`.toLowerCase();
  }
}

type TUsersToInsert = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  email: string;
  hash: string;
  id: string;
  name: string;
};
