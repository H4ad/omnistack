//#region Imports

import { Body, ClassSerializerInterceptor, Controller, InternalServerErrorException, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginPayload } from '../models/login.payload';
import { TokenProxy } from '../models/token.proxy';
import { AuthService } from '../services/auth.service';

//#endregion

/**
 * A classe que representa o construtor que lida com as autenticações
 */
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna o token do usuário
   *
   * @param req As informações da requisição
   * @param payload As informações para o login
   */
  @ApiOperation({ summary: 'Autentica um usuário' })
  @ApiOkResponse({ description: 'O usuário foi logado com sucesso', type: TokenProxy })
  @ApiUnauthorizedResponse({ description: 'A senha digitada está incorreta.' })
  @ApiNotFoundResponse({ description: 'Não foi encontrado um usuário com esse e-mail.' })
  @UseGuards(AuthGuard('local'))
  @Post('/local')
  public async login(@Req() req: Request, @Body() payload: LoginPayload): Promise<TokenProxy> {
    if (!req.user)
      throw new InternalServerErrorException();

    return await this.authService.signIn(req.user);
  }

  //#endregion

}
