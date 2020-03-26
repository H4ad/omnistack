//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';
import { UFEnum } from './uf.enum';

//#endregion

/**
 * A classe que representa as informações que serão usadas para criar uma ong
 */
export class CreateOngPayload extends BaseCrudCreatePayload {

  /**
   * O nome dessa ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o nome dessa ong.' })
  @MinLength(1, { message: 'O nome da ong precisa ter ao menos um caracter.' })
  @MaxLength(255, { message: 'O nome da ong não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a cidade na qual se localiza essa ong.' })
  @MinLength(1, { message: 'O nome da cidade precisa ter ao menos um caracter.' })
  @MaxLength(255, { message: 'O nome da cidade não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public city: string;

  /**
   * O estado na qual está localizada essa ong
   */
  @ApiProperty({ enum: UFEnum })
  @IsDefined({ message: 'É necessário enviar a sigla do estado dessa ong.' })
  @MaxLength(2, { message: 'A sigla do estado não pode ter mais que 2 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEnum(UFEnum, { message: 'A sigla enviada não é válida.' })
  public uf: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o whatsapp de contato dessa ong.' })
  @MinLength(11, { message: 'É necessário enviar um número de telefone válido com DDD.' })
  @MaxLength(255, { message: 'O número de WhatsApp não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  // TODO: Talvez adicionar uma validação melhorar para o número de WhatsApp
  public whatsapp: string;

}
