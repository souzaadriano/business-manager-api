import { Uuid } from '../uuid/uuid.class';
import { PERMISSIONS } from './permission.enum';

export class Permissions {
  private static readonly _validPermissions: Set<string> = new Set(Object.values(PERMISSIONS));
  private readonly _permissions: Set<PERMISSIONS>;
  private readonly _storeIds: Set<string>;

  constructor(parameters: TPermissionsParameters) {
    this._permissions = new Set(parameters.permissions);
    this, (this._storeIds = new Set(parameters.storeIds?.map((id) => id.value)));
  }

  public has(permission: PERMISSIONS): boolean {
    return this._permissions.has(permission);
  }

  public store(id: Uuid): boolean {
    return this._storeIds.has(id.value);
  }

  list(): PERMISSIONS[] {
    return Array.from(this._permissions.values());
  }

  stores(): string[] {
    return Array.from(this._storeIds.values());
  }

  static fromString(permission: string): PERMISSIONS {
    if (!Permissions._validPermissions.has(permission)) throw new Error();

    return permission as PERMISSIONS;
  }

  static fromArray(permissions: string[], storeIds?: string[]): Permissions {
    return new Permissions({
      permissions: permissions.map(Permissions.fromString),
      storeIds: storeIds ? storeIds.map((storeId) => new Uuid(storeId)) : [],
    });
  }
}

type TPermissionsParameters = {
  permissions?: PERMISSIONS[];
  storeIds?: Uuid[];
};
