import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';

export class PermissionSeedHelper {
  private readonly _filePath = 'src/engines/database/seeds/permissions-seed/permissions.data.json';
  private readonly _currentPermissions = Object.values(PERMISSIONS);

  async permissionsDiff(
    generatorhandler: IGeneratorHandler,
    dbPermissions: TPermissionInput[],
  ): Promise<TPermissionsDiff> {
    const permissions = new Set(dbPermissions.map(({ name }) => name));
    const permissionsWithoutRegister = this._currentPermissions.filter((permission) => {
      return !permissions.has(permission);
    });

    const newPermissions = permissionsWithoutRegister.map((name): TPermissionInput => {
      const uuid = generatorhandler.uuid();

      return {
        id: uuid.value,
        name,
        ...this._generateDates(),
      };
    });

    return {
      combination: [...dbPermissions, ...newPermissions],
      registred: dbPermissions,
      unregistred: newPermissions,
    };
  }

  private _generateDates() {
    const now = new Date();
    return {
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
  }
}

type TPermissionsDiff = {
  registred: TPermissionInput[];
  unregistred: TPermissionInput[];
  combination: TPermissionInput[];
};

export type TPermissionInput = {
  id: string;
  name: PERMISSIONS;
};
