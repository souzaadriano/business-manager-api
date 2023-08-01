import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { PermissionAccessor } from '../../accessors/permission.accessor';
import { AbstractSeed, SEED_PURPOSE } from '../seed.abstract';
import { PermissionSeedHelper, TPermissionInput } from './permissions-seed.helper';

export class PermissionsSeed extends AbstractSeed {
  private readonly _helper = new PermissionSeedHelper();
  private readonly _permissionsAccessor = new PermissionAccessor();

  readonly purpose = SEED_PURPOSE.PRODCUTION_POPULATE;
  readonly name = 'permissions';

  async up(): Promise<void> {
    const dbPermissions = await this._readDbPermissions();
    const { registred, unregistred } = await this._helper.permissionsDiff(this._generatorHandler, dbPermissions);
    await this._permissionsAccessor.addPermissions(unregistred);

    console.log(`Created ${unregistred.length} new permissions, and have a total ${registred.length} of permissions`);
  }

  down(): Promise<void> {
    return;
  }

  private async _readDbPermissions() {
    const permissions = await this._permissionsAccessor.readPermissions();
    return permissions.map(
      (permission): TPermissionInput => ({
        id: permission.id,
        name: permission.name as PERMISSIONS,
      }),
    );
  }
}
