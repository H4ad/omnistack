//#region Imports

import { BadRequestException, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { UserEntity } from '../../../../src/modules/user/entities/user.entity';
import { UserService } from '../../../../src/modules/user/services/user.service';

//#endregion

@ApiTags('tests')
@Controller('tests')
export class TestController {

  //#region Constructor

  constructor(
    private readonly connection: Connection,
    private readonly config: ConfigService,
    private readonly user: UserService,
  ) {
  }

  //#endregion

  //#region Public Methods

  @Post('clear')
  @ApiOperation({ summary: 'Limpa todo o banco de dados' })
  @ApiCreatedResponse({ description: 'O banco de dados foi limpo com sucesso.' })
  @ApiBadRequestResponse({ description: 'Só é permitido executar essa operação enquanto está no ambiente de teste.' })
  @HttpCode(204)
  public async clearDatabase(): Promise<void> {
    if (this.config.get<string>('NODE_ENV') !== 'test')
      throw new BadRequestException('Não é permitido limpar o banco de dados caso não esteja no ambiente de teste.');

    await this.connection.synchronize(true);
  }

  @Post('seed/users')
  @ApiOperation({ summary: 'Preenche o banco de dados com usuários padrões.' })
  @ApiNoContentResponse({ description: 'O banco de dados foi preenchido com sucesso.' })
  @ApiBadRequestResponse({ description: 'Só é permitido executar essa operação enquanto está no ambiente de teste.' })
  @HttpCode(204)
  public async seedUsers(): Promise<void> {
    if (this.config.get<string>('NODE_ENV') !== 'test')
      throw new BadRequestException('Não é permitido limpar o banco de dados caso não esteja no ambiente de teste.');

    const userRepository = this.connection.getRepository(UserEntity);

    const admin = await this.user.createOne({
      email: 'admin@email.com',
      password: '123456',
    });
    await this.user.createOne({
      email: 'user@email.com',
      password: '123456',
    });
    await this.user.createOne({
      email: 'userTwo@email.com',
      password: '123456',
    });

    admin.roles = 'admin';

    await userRepository.save(admin);
  }

  //#endregion

}
