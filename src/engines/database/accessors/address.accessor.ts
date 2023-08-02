import { createAddress, findAddressById, findAddressByStoreId, updateAddress } from '../queries/address.queries';
import { AbstractDatabaseAccessor } from './database-accessor.abstract';

export class AddressAccessor extends AbstractDatabaseAccessor {
  readonly createAddress = this._database.insert(createAddress);
  readonly findAddressById = this._database.first(findAddressById);
  readonly findAddressByStoreId = this._database.first(findAddressByStoreId);
  readonly updateAddress = this._database.update(updateAddress);
}
