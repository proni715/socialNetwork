import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: UserModel): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const { user, headers }: Request = context.switchToHttp().getRequest();

    return user ? true : false;
  }
}
