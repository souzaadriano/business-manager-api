import { PermissionAccessor } from '../../accessors/permission.accessor';
import { AbstractSeed, SEED_PURPOSE } from '../seed.abstract';
import { PermissionSeedHelper } from './permissions-seed.helper';

export class PermissionsSeed extends AbstractSeed {
  private readonly _helper = new PermissionSeedHelper();
  private readonly _permissionsAccessor = new PermissionAccessor();

  readonly purpose = SEED_PURPOSE.PRODCUTION_POPULATE;
  readonly name = 'permissions';

  async up(): Promise<void> {
    const { combination, registred, unregistred } = await this._helper.permissionsDiff(this._generatorHandler);
    await this._permissionsAccessor.addPermissions(unregistred);
    await this._helper.updateFile(combination);

    console.log(`Created ${unregistred.length} new permissions, and have a total ${registred.length} of permissions`);
  }

  down(): Promise<void> {
    return;
  }
}
