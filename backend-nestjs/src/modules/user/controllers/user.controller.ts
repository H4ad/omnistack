//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../../typeorm/entities/user.entity';

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
  @ProtectTo('admin')
  @Get('/')
  @ApiOperation({ summary: 'Busca todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public async getMany(): Promise<CrudProxy<UserProxy>> {
    return await this.service.getMany()
      .then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que retorna as informações do próprio usuário que faz a requisição
   *
   * @param requestUser As informações do usuário que está fazendo a requisição
   */
  @ProtectTo('user', 'admin')
  @Get('/me')
  @ApiOperation({ summary: 'Retorna as informações do próprio usuário' })
  @ApiOkResponse({ type: UserProxy })
  public async getMe(@User() requestUser: UserEntity): Promise<CrudProxy<UserProxy>> {
    const requestUserId = requestUser.id;

    return await this.service.getOne(requestUserId, requestUserId)
      .then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param id A identificação do usuário
   */
  @ProtectTo('user', 'admin')
  @Get('/:id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiOkResponse({ type: UserProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') id: number): Promise<CrudProxy<UserProxy>> {
    return await this.service.getOne(requestUser.id, +id)
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
   * @param requestUser As informações do usuário que está fazendo a requisição
   * @param id A identificação do usuário
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiOkResponse({ type: UserProxy })
  public async updateOne(@User() requestUser: UserEntity, @Param('id') id: number, @Body() payload: UpdateUserPayload): Promise<CrudProxy<UserProxy>> {
    return await this.service.updateOne(requestUser.id, +id, payload)
      .then(response => mapCrud(UserProxy, response));
  }

  //#endregion

}
