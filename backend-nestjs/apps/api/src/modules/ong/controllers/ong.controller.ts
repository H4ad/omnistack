//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../user/entities/user.entity';
import { CrudProxy, mapCrud } from '../../../infra/utils/crud';
import { CreateOngPayload } from '../models/create-ong.payload';
import { OngManyPaginationOptions } from '../models/ong-many.pagination.options';
import { OngProxy } from '../models/ong.proxy';
import { UpdateOngPayload } from '../models/update-ong.payload';
import { OngService } from '../services/ong.service';

//#endregion

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('ongs')
@Controller('ongs')
export class OngController {

  //#region Constructor

  constructor(
    private readonly service: OngService,
  ) { }

  //#endregion

  //#region Public Methods

  @Get('/')
  @ApiOperation({ summary: 'Busca todas as ongs' })
  @ApiOkResponse({ type: OngProxy, isArray: true })
  public async getMany(@Query(new ValidationPipe({ whitelist: true, transform: true })) options?: OngManyPaginationOptions): Promise<CrudProxy<OngProxy>> {
    return await this.service.getMany(options)
      .then(response => mapCrud(OngProxy, response));
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma ong pelo seu ID' })
  @ApiOkResponse({ type: OngProxy })
  public async getOne(@Param('id') id: number): Promise<CrudProxy<OngProxy>> {
    return await this.service.getOne(+id)
      .then(response => mapCrud(OngProxy, response));
  }

  @ProtectTo('user')
  @Post('/')
  @ApiOperation({ summary: 'Cria uma ong' })
  @ApiCreatedResponse({ type: OngProxy })
  public createOne(@User() requestUser: UserEntity, @Body() payload: CreateOngPayload): Promise<CrudProxy<OngProxy>> {
    return this.service.createOne(requestUser.id, payload)
      .then(response => mapCrud(OngProxy, response));
  }

  @ProtectTo('user')
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma ong' })
  @ApiOkResponse({ type: OngProxy })
  public async updateOne(@User() requestUser: UserEntity, @Param('id') id: number, @Body() payload: UpdateOngPayload): Promise<CrudProxy<OngProxy>> {
    return await this.service.updateOne(requestUser.id, +id, payload)
      .then(response => mapCrud(OngProxy, response));
  }

  //#endregion

}
