//#region Imports

import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

import { DefaultValidationMessages } from '../enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para realizar login
 */
export class LoginPayload {

  /**
   * O e-mail do usuário
   */
  @IsDefined({ message: 'É necessário digitar o e-mail.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEmail({}, { message: DefaultValidationMessages.IsEmail })
  username: string;

  /**
   * A senha do usuário
   */
  @IsDefined({ message: 'É necessário digitar a senha.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' })
  password: string;

}
