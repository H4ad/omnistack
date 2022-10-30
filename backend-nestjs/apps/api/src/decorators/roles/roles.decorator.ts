import { SetMetadata } from '@nestjs/common';
import { RolesDecoratorMetadataToken } from './tokens';

export const Roles = (...roles: string[]) => SetMetadata(RolesDecoratorMetadataToken, roles);
