//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';
import { UFEnum } from './uf.enum';

//#endregion

/**
 * A classe que representa as informações que serão usadas para atualizar uma ong
 */
export class UpdateOngPayload extends BaseCrudUpdatePayload {

  /**
   * O nome dessa ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'O nome da ong não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name?: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'O nome da cidade não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public city?: string;

  /**
   * O estado na qual está localizada essa ong
   */
  @ApiPropertyOptional({ enum: UFEnum })
  @IsOptional()
  @MaxLength(2, { message: 'A sigla do estado não pode ter mais que 2 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEnum(UFEnum, { message: 'A sigla enviada não é válida.' })
  public uf: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'O número de WhatsApp não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  // TODO: Talvez adicionar uma validação melhorar para o número de WhatsApp
  public whatsapp: string;

}
