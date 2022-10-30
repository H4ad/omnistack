//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength } from 'class-validator';
import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

//#endregion

export class CreateIncidentPayload extends BaseCrudCreatePayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o titulo desse incidente.' })
  @MaxLength(255, { message: 'O titulo desse incidente não pode ter mais que 255 caracteres.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public title!: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário a descrição desse incidente.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public description!: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário o valor que você requisita de ajuda para incidente.' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: DefaultValidationMessages.IsNumber })
  public value!: number;

  @ApiProperty()
  @IsDefined({ message: 'É necessário a identificação da ong na qual pertence esse incidente.' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: DefaultValidationMessages.IsNumber })
  public ongId!: number;


}
