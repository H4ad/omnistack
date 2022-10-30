//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/default-validation-messages';


//#endregion

export class LoginPayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o e-mail do usuário.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEmail({}, { message: DefaultValidationMessages.IsEmail })
  public username!: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a senha do usuário.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' })
  public password!: string;

}
