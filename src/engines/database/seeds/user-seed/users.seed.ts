import { HashHandlerFactory } from '@/factories/adapters';
import { UsersAccessor } from '../../accessors';
import { AbstractSeed } from '../seed.abstract';
import { USER_NAMES } from './user-names.constants';

export class UsersSeed extends AbstractSeed {
  private readonly _userAccessor = new UsersAccessor();
  private readonly _hashHandler = HashHandlerFactory.instance();

  async up(): Promise<void> {
    const users = await this.generateUserInputs();
    await Promise.all(users.map((user) => this._userAccessor.createUser(user)));
  }

  async down(): Promise<void> {
    await this._deleteAccessor.deleteAllUsers();
  }

  private async generateUserInputs() {
    const hash = await this._hashHandler.generate('test1234');
    return USER_NAMES.map(({ first, last, deleted }) => ({
      createdAt: this._date,
      updatedAt: this._date,
      deletedAt: deleted ? this._deletedAt : null,
      email: `${first}.${last}@test.com`,
      hash: hash.value,
      id: this._generatorHandler.uuid().value,
      name: `${first} ${last}`,
    }));
  }
}
