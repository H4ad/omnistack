//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

//#endregion

export class PaginationOptions {

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'É necessário enviar um número válido para o limite.' })
  @Transform(value => Number(value.value))
  @Min(0, { message: 'Não é permitido enviar limites menores que 1 para a páginação.' })
  @Max(100, { message: 'Não é permitido enviar limites maiores que 100 para a páginação.' })
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'É necessário enviar um número válido para a página.' })
  @Transform(value => Number(value.value))
  @Min(0, { message: 'Não é permitido enviar uma página menor que 1 para a páginação.' })
  public page?: number;

  @ApiPropertyOptional({ type: String, isArray: true })
  @Type(() => String)
  @IsOptional()
  @Transform(value => Array.isArray(value.value) && value.value || typeof value.value === 'string' && value.value.split(',') || [])
  @IsString({ each: true, message: 'É necessário enviar um texto válido para a relação.' })
  public relations?: string[];

}
