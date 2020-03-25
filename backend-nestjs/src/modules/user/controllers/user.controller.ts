//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CrudProxy, mapCrud } from '../../../utils/crud';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';

//#endregion

/**
 * A classe que representa o construtor que lida com as rotas de um usuário
 */
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: UserService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   */
  @Get('/')
  @ApiOperation({ summary: 'Busca todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public async getMany(): Promise<CrudProxy<UserProxy>> {
    return await this.service.getMany()
      .then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param id A identificação do usuário
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiOkResponse({ type: UserProxy })
  public async getOne(@Param('id') id: number): Promise<CrudProxy<UserProxy>> {
    return await this.service.getOne(+id)
      .then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  @Post('/')
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiCreatedResponse({ type: UserProxy })
  public createOne(@Body() payload: CreateUserPayload): Promise<CrudProxy<UserProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param id A identificação do usuário
   * @param payload As informações para a atualização da entidade
   */
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiOkResponse({ type: UserProxy })
  public async updateOne(@Param('id') id: number, @Body() payload: UpdateUserPayload): Promise<CrudProxy<UserProxy>> {
    return await this.service.updateOne(+id, payload)
      .then(response => mapCrud(UserProxy, response));
  }

  //#endregion

}
