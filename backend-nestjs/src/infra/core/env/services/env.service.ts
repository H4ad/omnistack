//#region Imports

import { Injectable } from '@nestjs/common';
import { CleanEnv } from 'envalid';
import { implementOptionalInterface } from '../../../../utils/interface';
import { IDotEnv } from '../../dotenv/models/dotenv';
import { DotenvService } from '../../dotenv/services/dotenv.service';

//#endregion

/**
 * A classe que representa o serviço que guarda as configurações do ambiente
 */
@Injectable()
export class EnvService extends implementOptionalInterface<Partial<Readonly<IDotEnv>> & CleanEnv>() {

  //#region Constructor

  /**
   * Construtor padrão
   */
  private constructor() {
    super();
  }

  //#endregion

  //#region Public Properties

  /**
   * Diz se está no ambiente de testes
   */
  get isTest(): boolean {
    return this.NODE_ENV === 'test';
  }

  //#endregion

  //#region Static Methods

  /**
   * Método que realiza a construção do serviço de variável de ambiente
   */
  public static factory(): EnvService {
    const baseEnvVariables = DotenvService.getValidatedEnvs();

    const envService = new EnvService();
    Object.assign(envService, baseEnvVariables);

    return envService;
  }

  //#endregion

}
