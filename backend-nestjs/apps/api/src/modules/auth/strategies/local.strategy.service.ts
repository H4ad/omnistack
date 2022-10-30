//#region Imports

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

//#endregion

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  //#region Constructors

  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }

  //#endregion

  public async validate(username: string, password: string): Promise<any> {
    return await this.authService.authenticate({ username, password });
  }
}
