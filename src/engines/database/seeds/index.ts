import { PermissionsSeed } from './permissions-seed/permissions.seed';
import { UsersSeed } from './user-seed/users.seed';

export const seeds = [new UsersSeed(), new PermissionsSeed()];
