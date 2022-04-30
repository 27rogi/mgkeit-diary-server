import { SetMetadata } from '@nestjs/common';

export const UsePermissions = (...permissions: string[]) => SetMetadata('permissions', permissions);
