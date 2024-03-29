import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../roles/roles.decorator';

export function ProtectTo(...roles: string[]): MethodDecorator {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Você não tem permissão para acessar esse recurso. ' }),
  );
}

