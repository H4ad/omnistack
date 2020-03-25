//#region Imports

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

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
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = new Reflector().get<string[]>('roles', context.getHandler());

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
