//#region Imports

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { UserEntity } from '../entities/user.entity';
import { isValid } from '../../../utils/functions';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';

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
  public async getMany(): Promise<UserEntity[]> {
    return await this.repository.createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .getMany();
  }

  /**
   * Método que retorna um usuário pela sua identificação
   *
   * @param requestUserId A identificação do usuário que está fazendo a requisição
   * @param userId A identificação do usuário
   */
  public async getOne(requestUserId: number, userId: number): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!user)
      throw new NotFoundException('O usuário que você procura não existe ou foi desativado.');

    if (requestUserId !== userId)
      throw new UnauthorizedException('Você não tem permissão para visualizar as informações de outro usuário.');

    return user;
  }

  /**
   * Método que cria um novo usuário
   *
   * @param payload As informações para a criação do usuário
   */
  public async createOne(payload: CreateUserPayload): Promise<UserEntity> {
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
   * @param requestUserId A identificação do usuário que está fazendo a requisição
   * @param userId A identificação do usuário que será atualizado
   * @param payload As informações para a criação do usuário
   */
  public async updateOne(requestUserId: number, userId: number, payload: UpdateUserPayload): Promise<UserEntity> {
    const isUserExists = await this.exists(userId);

    if (!isUserExists)
      throw new NotFoundException('O usuário que você procura não foi encontrado.');

    const user = this.getEntityFromPayload(payload, userId);

    if (requestUserId !== userId)
      throw new UnauthorizedException('Você não tem permissão para atualizar as informações de outro usuário.');

    if (isValid(user.email)) {
      const alreadyHasUser = await this.alreadyHasUserWith(user.email, user.id);

      if (alreadyHasUser)
        throw new BadRequestException('Já existe um outro usuário cadastrado com esse e-mail.');
    }

    if (isValid(user.password))
      user.password = await this.getEncryptedPassword(user.password);

    return await this.repository.save(user);
  }

  /**
   * Método que verifica se existe uma certa entidade
   *
   * @param entityId A identificação da entidade
   */
  public async exists(entityId: number): Promise<boolean> {
    return await this.repository.createQueryBuilder('entity')
      .where('entity.id = :entityId', { entityId })
      .getCount()
      .then(count => count > 0);
  }

  /**
   * Método que retorna um usuário pelo seu e-mail
   *
   * @param email O e-mail do usuário
   */
  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: {
        email,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!user)
      throw new NotFoundException('O usuário que você procura não existe ou foi desativado.');

    return user;
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que verifica se já existe um usuário com um determinado e-mail
   *
   * @param email O e-mail a ser verificado
   * @param ignoreUserId A identificação do usuário que deve ignorar
   */
  private async alreadyHasUserWith(email: string, ignoreUserId: number = 0): Promise<boolean> {
    return await this.repository.createQueryBuilder('user')
      .where('user.email = :email AND user.id != :ignoreUserId', { email, ignoreUserId })
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
      ...isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

  //#endregion

}
