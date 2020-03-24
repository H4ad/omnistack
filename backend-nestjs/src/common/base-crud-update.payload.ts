//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { DefaultValidationMessages } from './default-validation-messages';

//#endregion

/**
 * A classe que representa as informações básicas para atualizar uma entidade
 */
export class BaseCrudUpdatePayload {

  /**
   * Diz se deve ativar a entidade assim que criar
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({  message: DefaultValidationMessages.IsBoolean })
  isActive?: boolean;

}
