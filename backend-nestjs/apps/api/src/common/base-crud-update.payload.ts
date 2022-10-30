//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { DefaultValidationMessages } from './default-validation-messages';

//#endregion

export class BaseCrudUpdatePayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean })
  public isActive?: boolean;

}
