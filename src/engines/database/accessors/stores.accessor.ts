import {
  addUserToStore,
  createStore,
  createStoreProfile,
  findStoreById,
  listActiveStores,
  listAllStores,
  listStoreEmployeesByStoreId,
  softDeleteStore,
} from '../queries/stores.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class StoreAccessor extends AbstractDatabaseAccessor {
  readonly createStore = this._database.insert(createStore);
  readonly addUserToStore = this._database.insert(addUserToStore);
  readonly createStoreProfile = this._database.insert(createStoreProfile);
  readonly findStoreById = this._database.first(findStoreById);
  readonly listActiveStores = this._database.select(listActiveStores);
  readonly listAllStores = this._database.select(listAllStores);
  readonly softDeleteStore = this._database.update(softDeleteStore);
  readonly listStoreEmployeesByStoreId = this._database.select(listStoreEmployeesByStoreId);
}
