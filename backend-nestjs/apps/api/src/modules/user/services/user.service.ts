//#region Imports

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { encryptPassword } from '../../../infra/core/bcrypt/password';
import { isValid } from '../../../infra/utils/functions';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';

//#endregion

@Injectable()
export class UserService {

  //#region Constructor

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {  }

  //#endregion

  //#region Public Methods

  public async getMany(): Promise<UserEntity[]> {
    return await this.repository.createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .getMany();
  }

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

  public async createOne(payload: CreateUserPayload): Promise<UserEntity> {
    const user = this.getEntityFromPayload(payload);
    const alreadyHasUser = await this.alreadyHasUserWith(user.email);

    if (alreadyHasUser)
      throw new BadRequestException('Já existe um usuário cadastrado com esse e-mail.');

    user.password = await encryptPassword(user.password);
    user.roles = 'user';

    return await this.repository.save(user);
  }

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
      user.password = await encryptPassword(user.password);

    return await this.repository.save(user);
  }

  public async exists(entityId: number): Promise<boolean> {
    return await this.repository.createQueryBuilder('entity')
      .where('entity.id = :entityId', { entityId })
      .getCount()
      .then(count => count > 0);
  }

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

  private async alreadyHasUserWith(email: string, ignoreUserId: number = 0): Promise<boolean> {
    return await this.repository.createQueryBuilder('user')
      .where('user.email = :email AND user.id != :ignoreUserId', { email, ignoreUserId })
      .getCount()
      .then(count => count > 0);
  }

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
