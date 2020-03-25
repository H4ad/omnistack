//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PaginationOptions } from '../../../common/pagination.options';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { CreateOngPayload } from '../models/create-ong.payload';
import { OngProxy } from '../models/ong.proxy';
import { UpdateOngPayload } from '../models/update-ong.payload';
import { OngService } from '../services/ong.service';

//#endregion

/**
 * A classe que representa o construtor que lida com as rotas de uma ong
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('ongs')
@Controller('ongs')
export class OngController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: OngService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   *
   * @param options As opções de paginação
   */
  @Get('/')
  @ApiOperation({ summary: 'Busca todas as ongs' })
  @ApiOkResponse({ type: OngProxy, isArray: true })
  public async getMany(@Query(new ValidationPipe({ whitelist: true, transform: true })) options?: PaginationOptions): Promise<CrudProxy<OngProxy>> {
    return await this.service.getMany(options)
      .then(response => mapCrud(OngProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param id A identificação da entidade
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma ong pelo seu ID' })
  @ApiOkResponse({ type: OngProxy })
  public async getOne(@Param('id') id: number): Promise<CrudProxy<OngProxy>> {
    return await this.service.getOne(+id)
      .then(response => mapCrud(OngProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  @Post('/')
  @ApiOperation({ summary: 'Cria uma ong' })
  @ApiCreatedResponse({ type: OngProxy })
  public createOne(@Body() payload: CreateOngPayload): Promise<CrudProxy<OngProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(OngProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param id A identificação da entidade
   * @param payload As informações para a atualização da entidade
   */
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma ong' })
  @ApiOkResponse({ type: OngProxy })
  public async updateOne(@Param('id') id: number, @Body() payload: UpdateOngPayload): Promise<CrudProxy<OngProxy>> {
    return await this.service.updateOne(+id, payload)
      .then(response => mapCrud(OngProxy, response));
  }

  //#endregion

}
