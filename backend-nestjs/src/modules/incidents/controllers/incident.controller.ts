//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PaginationOptions } from '../../../common/pagination.options';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { CreateIncidentPayload } from '../models/create-incident.payload';
import { IncidentProxy } from '../models/incidents.proxy';
import { IncidentService } from '../services/incident.service';

//#endregion

/**
 * A classe que representa o controller que lida com as rotas dos incidentes
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('incidents')
@Controller('incidents')
export class IncidentController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: IncidentService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   *
   * @param options As opções de paginação
   */
  @Get('/')
  @ApiOperation({ summary: 'Busca todos os incidentes' })
  @ApiOkResponse({ type: IncidentProxy, isArray: true })
  public async getMany(@Query(new ValidationPipe({ whitelist: true, transform: true })) options?: PaginationOptions): Promise<CrudProxy<IncidentProxy>> {
    return await this.service.getMany(options)
      .then(response => mapCrud(IncidentProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param id A identificação da entidade
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Busca um incidente pelo seu ID' })
  @ApiOkResponse({ type: IncidentProxy })
  public async getOne(@Param('id') id: number): Promise<CrudProxy<IncidentProxy>> {
    return await this.service.getOne(+id)
      .then(response => mapCrud(IncidentProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  @Post('/')
  @ApiOperation({ summary: 'Cria um incidente' })
  @ApiCreatedResponse({ type: IncidentProxy })
  public createOne(@Body() payload: CreateIncidentPayload): Promise<CrudProxy<IncidentProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(IncidentProxy, response));
  }

  //#endregion

}