//#region Imports

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { isValid } from '../../../infra/utils/functions';
import { OngEntity } from '../entities/ong.entity';
import { CreateOngPayload } from '../models/create-ong.payload';
import { OngManyPaginationOptions } from '../models/ong-many.pagination.options';
import { UpdateOngPayload } from '../models/update-ong.payload';

//#endregion

@Injectable()
export class OngService {

  //#region Constructor

  constructor(
    @InjectRepository(OngEntity)
    private readonly repository: Repository<OngEntity>,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getMany(options?: OngManyPaginationOptions): Promise<[OngEntity[], number]> {
    const { limit = 15, page = 1, relations = [], userId } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    let query = this.repository.createQueryBuilder('ong')
      .where('ong.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .limit(normalizedLimit)
      .offset((normalizedPage - 1) * limit);

    if (relations.some(relation => relation === 'user'))
      query = query.leftJoinAndSelect('ong.user', 'user');

    if (relations.some(relation => relation === 'cases'))
      query = query.leftJoinAndSelect('ong.cases', 'case', 'case.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE });

    if (userId && Number(userId))
      query = query.andWhere('ong.userId = :userId', { userId: Number(userId) });

    return Promise.all([query.getMany(), query.getCount()]);
  }

  public async getOne(ongId: number): Promise<OngEntity> {
    const ong = await this.repository.findOne({
      where: {
        id: ongId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!ong)
      throw new NotFoundException('A ONG que você procura não existe ou foi desativada.');

    return ong;
  }

  public async createOne(requestUserId: number, payload: CreateOngPayload): Promise<OngEntity> {
    const ong = this.getEntityFromPayload(payload);

    ong.userId = requestUserId;

    return await this.repository.save(ong);
  }

  public async updateOne(requestUserId: number, ongId: number, payload: UpdateOngPayload): Promise<OngEntity> {
    const ongEntity = await this.getOne(ongId);

    if (ongEntity.userId !== requestUserId)
      throw new UnauthorizedException('Você não tem permissão para alterar as informações de uma ONG que não pertence a você.');

    const ong = this.getEntityFromPayload(payload, ongId);

    return await this.repository.save(ong);
  }

  //#endregion

  //#region Private Methods

  private getEntityFromPayload(payload: CreateOngPayload | UpdateOngPayload, entityId?: number): OngEntity {
    return new OngEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.name) && { name: payload.name },
      ...isValid(payload.email) && { email: payload.email },
      ...isValid(payload.city) && { city: payload.city },
      ...isValid(payload.uf) && { uf: payload.uf },
      ...isValid(payload.whatsapp) && { whatsapp: payload.whatsapp },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

  //#endregion

}
