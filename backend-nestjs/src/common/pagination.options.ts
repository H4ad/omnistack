//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

//#endregion

/**
 * A interface que representa as opções para uma paginação
 */
export class PaginationOptions {

  /**
   * O limite de itens que podem ser enviados
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'É necessário enviar um número válido para o limite.' })
  @Transform(value => Number(value))
  @Min(0, { message: 'Não é permitido enviar limites menores que 1 para a páginação.' })
  @Max(100, { message: 'Não é permitido enviar limites maiores que 100 para a páginação.' })
  limit?: number;

  /**
   * A página na qual deve ser buscada
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'É necessário enviar um número válido para a página.' })
  @Transform(value => Number(value))
  @Min(0, { message: 'Não é permitido enviar uma página menor que 1 para a páginação.' })
  page?: number;

  /**
   * A lista de relações que ele deve incluir
   */
  @ApiPropertyOptional({ type: String, isArray: true })
  @Type(() => String)
  @IsOptional()
  @Transform(value => Array.isArray(value) && value || value.split(','))
  @IsString({ each: true, message: 'É necessário enviar um texto válido para a relação.' })
  relations?: string[];

}
