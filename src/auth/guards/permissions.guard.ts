import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (permissions) {
      const user = context.switchToHttp().getRequest().user;
      if (user.role && user.role.permissions) {
        if (permissions.every((perm) => user.role.permissions.includes(perm))) {
          return true;
        }
      }

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: `You don't have enough permissions to access this page!`,
          requiredPermissions: permissions,
          currentRole: user.role,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return false;
  }
}
