//#region Imports

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcryptjs from 'bcryptjs';

import { Repository } from 'typeorm';

import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { isValid } from '../../../utils/functions';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';

//#endregion

/**
 * A classe que representa o serviço que lida com os usuários
 */
@Injectable()
export class UserService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna vários usuários cadastrados no banco de dados
   */
  public async getMany(): Promise<UserProxy[]> {
    return await this.repository.createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .getMany();
  }

  /**
   * Método que retorna um usuário pela sua identificação
   *
   * @param userId A identificação do usuário
   */
  public async getOne(userId: number): Promise<UserProxy> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!user)
      throw new NotFoundException('O usuário que você procura não existe ou foi desativado.');

    return user;
  }

  /**
   * Método que cria um novo usuário
   *
   * @param payload As informações para a criação do usuário
   */
  public async createOne(payload: CreateUserPayload): Promise<UserProxy> {
    const user = this.getEntityFromPayload(payload);
    const alreadyHasUser = await this.alreadyHasUserWith(user.email);

    if (alreadyHasUser)
      throw new BadRequestException('Já existe um usuário cadastrado com esse e-mail.');

    user.password = await this.getEncryptedPassword(user.password);
    user.roles = 'user';

    return await this.repository.save(user);
  }

  /**
   * Método que atualiza um usuário
   *
   * @param userId A identificação do usuário que será atualizado
   * @param payload As informações para a criação do usuário
   */
  public async updateOne(userId: number, payload: UpdateUserPayload): Promise<UserProxy> {
    const user = this.getEntityFromPayload(payload, userId);

    if (isValid(user.email)) {
      const alreadyHasUser = await this.alreadyHasUserWith(user.email);

      if (alreadyHasUser)
        throw new BadRequestException('Já existe um usuário cadastrado com esse e-mail.');
    }

    if (isValid(user.password))
      user.password = await this.getEncryptedPassword(user.password);

    // TODO: Adicionar verifição depois quando houver autenticação

    return await this.repository.save(user);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que verifica se já existe um usuário com um determinado e-mail
   *
   * @param email O e-mail a ser verificado
   */
  private async alreadyHasUserWith(email: string): Promise<boolean> {
    return await this.repository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getCount()
      .then(count => count > 0);
  }

  /**
   * Método que encripta a senha do usuário
   *
   * @param plainPassword A senha em texto puro
   */
  private async getEncryptedPassword(plainPassword: string): Promise<string> {
    const salt = await bcryptjs.genSalt();

    return await bcryptjs.hash(plainPassword, salt);
  }

  /**
   * Método que retorna as informações de uma entidade a partir das informações do payload
   *
   * @param payload As informações do payload
   * @param entityId A identificação da entidade
   */
  private getEntityFromPayload(payload: CreateUserPayload | UpdateUserPayload, entityId?: number): UserEntity {
    return new UserEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.email) && { email: payload.email },
      ...isValid(payload.password) && { password: payload.password },
    });
  }

  //#endregion

}
