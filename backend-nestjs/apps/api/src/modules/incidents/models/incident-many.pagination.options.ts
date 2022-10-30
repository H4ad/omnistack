//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationOptions } from '../../../common/pagination.options';

//#endregion

export class IncidentManyPaginationOptions extends PaginationOptions {

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(value => Number(value.value))
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'A identificação da ONG precisa ser um número válido.' })
  public ongId?: number;

}
