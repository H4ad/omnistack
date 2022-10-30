//#region  Imports

import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Sentry from '@sentry/node';
import * as bcryptjs from 'bcryptjs';
import ms from 'ms';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { IJwtPayload } from '../models/jwt.payload';
import { LoginPayload } from '../models/login.payload';
import { TokenProxy } from '../models/token.proxy';

//#endregion

@Injectable()
export class AuthService {

  //#region  Constructor

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) { }

  //#endregion

  //#region Public Methods

  public async signIn(user: Partial<UserEntity>, expiresInMilliseconds?: number): Promise<TokenProxy> {
    const { id, roles, createdAt, updatedAt, isActive } = user;
    const expiresIn = expiresInMilliseconds && ms(expiresInMilliseconds) || this.config.get<string>('JWT_EXPIRES_IN')!;

    const token = await this.jwtService.signAsync({
      id,
      roles,
      createdAt,
      updatedAt,
      isActive,
    }, { expiresIn });

    const now = Date.now().valueOf();
    const expiresAt = new Date(now + ms(expiresIn));

    return new TokenProxy({ token: `Bearer ${ token }`, expiresAt });
  }

  public async authenticate({ username, password: passwordWithoutEncryption }: LoginPayload): Promise<Partial<UserEntity>> {
    const { password, ...user } = await this.userService.getUserByEmail(username);

    const passwordIsMatch = await bcryptjs.compare(passwordWithoutEncryption, password);

    if (!passwordIsMatch)
      throw new UnauthorizedException('A senha ou o e-mail enviado estão incorretos.');

    return user;
  }

  public async validateUserByPayload(jwtPayload: IJwtPayload): Promise<UserEntity> {
    if (!jwtPayload)
      throw new UnauthorizedException('As informações para a autenticação não foram encontradas.');

    if (!jwtPayload.iat || !jwtPayload.exp || !jwtPayload.id)
      throw new UnauthorizedException('Os detalhes para a autenticação não foram encontrados.');

    const now = Date.now().valueOf() / 1000;
    const jwtExpiresIn = jwtPayload.exp;

    if (now > jwtExpiresIn)
      {throw new UnauthorizedException({
        error: HttpStatus.UNAUTHORIZED,
        message: 'O token de autenticação está expirado.',
        shouldLogout: true,
      });}

    const user = await this.userService.getOne(jwtPayload.id, jwtPayload.id);

    Sentry.setUser({ id: user.id.toString(), email: user.email });

    return user;
  }


  //#endregion

}
