//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, MaxLength } from 'class-validator';
import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';

//#endregion

export class CreateUserPayload extends BaseCrudCreatePayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar um e-mail.' })
  @MaxLength(255, { message: 'É necessário enviar um e-mail contendo menos de 255 caracteres.' })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  public email!: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar um senha.' })
  @MaxLength(255, { message: 'É necessário enviar uma senha contendo menos de 255 caracteres.' })
  public password!: string;

}
