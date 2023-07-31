import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { readFile, writeFile } from 'fs/promises';

export class PermissionSeedHelper {
  private readonly _filePath = 'src/engines/database/seeds/permissions-seed/permissions.data.json';
  private readonly _currentPermissions = Object.values(PERMISSIONS);

  async permissionsDiff(generatorhandler: IGeneratorHandler): Promise<TPermissionsDiff> {
    const input = await this._readPermissionsFile();
    const permissions = new Set(input.map(({ name }) => name));
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
      combination: [...input, ...newPermissions],
      registred: input,
      unregistred: newPermissions,
    };
  }

  async updateFile(input: TPermissionInput[]) {
    await writeFile(this._filePath, JSON.stringify(input, null, '\t'));
  }

  private async _readPermissionsFile(): Promise<TPermissionInput[]> {
    const permissions = await this._getPermissions();
    return permissions;
  }

  private _generateDates() {
    const now = new Date();
    return {
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
  }

  private async _getPermissions(): Promise<TPermissionInput[]> {
    const rawFile = await readFile(this._filePath, { encoding: 'utf-8' });
    return JSON.parse(rawFile);
  }
}

type TPermissionsDiff = {
  registred: TPermissionInput[];
  unregistred: TPermissionInput[];
  combination: TPermissionInput[];
};

type TPermissionInput = {
  id: string;
  name: PERMISSIONS;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
