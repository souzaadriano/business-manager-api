import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';

import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Session } from '@/core/domain/class/session/session.class';
import { AuthTokenFactory } from '@/factories/use-cases/auth-token.factory';
import { UserSessionFactory } from '@/factories/use-cases/user-session.factory';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly _authToken = AuthTokenFactory.instance();
  private readonly _userSession = UserSessionFactory.instance();

  constructor(private _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (this.isPublic(context)) return true;
      const { permissions, session, request } = await this.extractContext(context);
      this._checkPermissions(session, permissions);
      request['session'] = session;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }

  private async extractContext(context: ExecutionContext) {
    const request = this._getRequest(context);
    const permissions = this._getRoutePermissions(context);
    const userToken = await this._getToken(request);
    const session = await this._getSession(userToken);
    return { permissions, session, request };
  }

  private isPublic(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isPublic) return false;
    return true;
  }

  private _getRoutePermissions(context: ExecutionContext) {
    const requirePermissions = this._reflector.getAllAndOverride<PERMISSIONS[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requirePermissions) return [];
    return requirePermissions;
  }

  private _getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private async _getSession(token: { sessionId: string; userId: string }) {
    return await this._userSession.execute(token);
  }

  private _getToken(request: any) {
    return this._authToken.execute({ token: request.headers.authorization });
  }

  private _checkPermissions(session: Session, required: PERMISSIONS[]) {
    if (session.hasPermission(PERMISSIONS.MASTER)) return;
    const haveAccess = required.some((permission) => session.hasPermission(permission));
    if (!haveAccess) throw new UnauthorizedException();
  }
}
