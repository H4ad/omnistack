//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { PaginationOptions } from '../../../common/pagination.options';

//#endregion

/**
 * A classe que representa as opções de paginação de um incidente
 */
export class IncidentManyPaginationOptions extends PaginationOptions {

  /**
   * A identificação do usuário
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(value => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'A identificação da ONG precisa ser um número válido.' })
  public ongId?: number;

}
