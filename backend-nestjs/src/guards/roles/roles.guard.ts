//#region Imports

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesDecoratorMetadataToken } from '../../decorators/roles/tokens';

//#endregion

/**
 * A classe que representa o guard responsável por lidar com as roles dos usuários
 */
@Injectable()
export class RolesGuard implements CanActivate {

  //#region Public Methods

  /**
   * Método executado ao ser validado esse guard
   *
   * @param context O contexto atual
   */
  public canActivate(context: ExecutionContext): boolean {
    const roles = new Reflector().get<string[]>(RolesDecoratorMetadataToken, context.getHandler());

    if (!roles)
      return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new UnauthorizedException('Você não tem permissão para acessar esses recursos.');

    const hasRole = () => user.roles.split('|').some((role) => roles.includes(role));

    if (user && user.roles && hasRole())
      return true;

    throw new UnauthorizedException('Você não tem permissão para acessar esses recursos.');
  }

  //#endregion
}
