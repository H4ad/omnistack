//#region  Imports

import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Sentry from '@sentry/node';

import * as bcryptjs from 'bcryptjs';

import { UserEntity } from '../../../typeorm/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { LoginPayload } from '../models/login.payload';
import { EnvService } from '../../env/services/env.service';
import { IJwtPayload } from '../models/jwt.payload';
import { TokenProxy } from '../models/token.proxy';

const ms = require('ms');

//#endregion

/**
 * A classe que representa o serviço que lida com as autenticações
 */
@Injectable()
export class AuthService {

  //#region  Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly env: EnvService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que realiza o login de um usuário
   *
   * @param user As informações do usuário
   * @param expiresInMilliseconds Diz quando o token deve ser expirado
   */
  public async signIn(user: Partial<UserEntity>, expiresInMilliseconds?: number): Promise<TokenProxy> {
    const { id, roles, createdAt, updatedAt, isActive } = user;
    const expiresIn = expiresInMilliseconds && ms(expiresInMilliseconds) || this.env.JWT_EXPIRES_IN;

    const token = await this.jwtService.signAsync({
      id,
      roles,
      createdAt,
      updatedAt,
      isActive,
    }, { expiresIn });

    const now = Date.now().valueOf();
    const expiresAt = now + ms(expiresIn);

    return new TokenProxy({ token: `Bearer ${ token }`, expiresAt });
  }

  /**
   * Método que realiza a autenticação de um usuário
   *
   * @param email O endereço de e-mail do usuário
   * @param passwordWithoutEncryption A senha do usuário
   */
  public async authenticate({ username, password: passwordWithoutEncryption }: LoginPayload): Promise<Partial<UserEntity>> {
    const { password, ...user } = await this.userService.getUserByEmail(username);

    const passwordIsMatch = await bcryptjs.compare(passwordWithoutEncryption, password);

    if (!passwordIsMatch)
      throw new UnauthorizedException('A senha ou o e-mail enviado estão incorretos.');

    return user;
  }

  /**
   * Método que valida um usuário com o base no payload extraido do token
   *
   * @param jwtPayload As informações extraidas do token
   */
  public async validateUserByPayload(jwtPayload: IJwtPayload): Promise<UserEntity> {
    if (!jwtPayload)
      throw new UnauthorizedException('As informações para a autenticação não foram encontradas.');

    if (!jwtPayload.iat || !jwtPayload.exp || !jwtPayload.id)
      throw new UnauthorizedException('Os detalhes para a autenticação não foram encontrados.');

    const now = Date.now().valueOf() / 1000;
    const jwtExpiresIn = jwtPayload.exp;

    if (now > jwtExpiresIn)
      throw new UnauthorizedException({
        error: HttpStatus.UNAUTHORIZED,
        message: 'O token de autenticação está expirado.',
        shouldLogout: true,
      });

    console.log(jwtPayload);
    const user = await this.userService.getOne(jwtPayload.id, jwtPayload.id);

    Sentry.setUser({ id: user.id.toString(), email: user.email });

    return user;
  }


  //#endregion

}
