//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Query, Res, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { CreateIncidentPayload } from '../models/create-incident.payload';
import { IncidentManyPaginationOptions } from '../models/incident-many.pagination.options';
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
   * @param response A referência para a resposta
   */
  @Get('/')
  @ApiOperation({ summary: 'Busca todos os incidentes' })
  @ApiOkResponse({ type: IncidentProxy, isArray: true })
  public async getMany(@Res() response: Response, @Query(new ValidationPipe({ whitelist: true, transform: true })) options?: IncidentManyPaginationOptions): Promise<void> {
    const [incidents, total] = await this.service.getMany(options);

    response.set('x-total-count', total.toString());
    response.send(incidents);
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
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param payload As informações para a criação da entidade
   */
  @ProtectTo('user')
  @Post('/')
  @ApiOperation({ summary: 'Cria um incidente' })
  @ApiCreatedResponse({ type: IncidentProxy })
  public createOne(@User() requestUser: UserEntity, @Body() payload: CreateIncidentPayload): Promise<CrudProxy<IncidentProxy>> {
    return this.service.createOne(requestUser.id, payload)
      .then(response => mapCrud(IncidentProxy, response));
  }

  /**
   * Método que deleta uma entidade
   *
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param id A identificação da entidade
   */
  @ProtectTo('user')
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um incidente' })
  @ApiCreatedResponse({ type: void 0 })
  public deleteOne(@User() requestUser: UserEntity, @Param('id') id: number): Promise<void> {
    return this.service.deleteOne(requestUser.id, id);
  }

  //#endregion

}
