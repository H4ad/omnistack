//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CrudProxy, mapCrud } from '../../../infra/utils/crud';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';

//#endregion

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController {

  //#region Constructor

  constructor(
    private readonly service: UserService,
  ) { }

  //#endregion

  //#region Public Methods

  @ProtectTo('admin')
  @Get('/')
  @ApiOperation({ summary: 'Busca todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public async getMany(): Promise<CrudProxy<UserProxy>> {
    return await this.service.getMany()
      .then(response => mapCrud(UserProxy, response));
  }

  @ProtectTo('user', 'admin')
  @Get('/me')
  @ApiOperation({ summary: 'Retorna as informações do próprio usuário' })
  @ApiOkResponse({ type: UserProxy })
  public async getMe(@User() requestUser: UserEntity): Promise<CrudProxy<UserProxy>> {
    const requestUserId = requestUser.id;

    return await this.service.getOne(requestUserId, requestUserId)
      .then(response => mapCrud(UserProxy, response));
  }

  @ProtectTo('user', 'admin')
  @Get('/:id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiOkResponse({ type: UserProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') id: number): Promise<CrudProxy<UserProxy>> {
    return await this.service.getOne(requestUser.id, +id)
      .then(response => mapCrud(UserProxy, response));
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiCreatedResponse({ type: UserProxy })
  public createOne(@Body() payload: CreateUserPayload): Promise<CrudProxy<UserProxy>> {
    return this.service.createOne(payload)
      .then(response => mapCrud(UserProxy, response));
  }

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
