import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permission = (...permissions: PERMISSIONS[]) => SetMetadata(PERMISSIONS_KEY, permissions);
