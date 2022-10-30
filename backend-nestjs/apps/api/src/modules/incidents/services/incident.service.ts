//#region Imports

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { IncidentEntity } from '../entities/incident.entity';
import { OngEntity } from '../../ong/entities/ong.entity';
import { isValid } from '../../../infra/utils/functions';
import { OngService } from '../../ong/services/ong.service';
import { CreateIncidentPayload } from '../models/create-incident.payload';
import { IncidentManyPaginationOptions } from '../models/incident-many.pagination.options';

//#endregion

@Injectable()
export class IncidentService {

  //#region Constructor

  constructor(
    @InjectRepository(IncidentEntity)
    private readonly repository: Repository<IncidentEntity>,
    private readonly ongService: OngService,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getMany(options?: IncidentManyPaginationOptions): Promise<[IncidentEntity[], number]> {
    const { limit = 15, page = 1, relations = [], ongId } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    let query = this.repository.createQueryBuilder('incident')
      .where('incident.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .limit(normalizedLimit)
      .offset((normalizedPage - 1) * limit);

    if (relations.some(relation => relation === 'ong'))
      query = query.leftJoinAndSelect('incident.ong', 'ong', 'ong.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE });

    if (ongId && Number(ongId))
      query = query.andWhere('incident.ongId = :ongId', { ongId: Number(ongId) });

    return query.getManyAndCount();
  }

  public async getOne(entityId: number): Promise<IncidentEntity> {
    const entity = await this.repository.findOne({
      where: {
        id: entityId,
        isActive: TypeOrmValueTypes.TRUE,
      },
    });

    if (!entity)
      throw new NotFoundException('O incidente que você procura não existe ou foi desativado.');

    return entity;
  }

  public async createOne(requestUserId: number, payload: CreateIncidentPayload): Promise<IncidentEntity> {
    const incident = this.getEntityFromPayload(payload);
    const ong = await this.ongService.getOne(incident.ongId);

    if (ong.userId !== requestUserId)
      throw new UnauthorizedException('Você não tem permissão para criar um incidente em uma ONG que não pertence a você.');

    return await this.repository.save(incident);
  }

  public async deleteOne(requestUserId: number, incidentId: number): Promise<void> {
    const incident = await this.getOne(incidentId);
    const ong = await this.ongService.getOne(incident.ongId);

    if (ong.userId !== requestUserId)
      throw new UnauthorizedException('Você não tem permissão para criar um incidente em uma ONG que não pertence a você.');

    await this.repository.remove(incident);
  }

  //#endregion

  //#region Private Methods

  private getEntityFromPayload(payload: CreateIncidentPayload): IncidentEntity {
    return new IncidentEntity({
      ...isValid(payload.title) && { title: payload.title },
      ...isValid(payload.description) && { description: payload.description },
      ...isValid(payload.value) && { value: payload.value },
      ...isValid(payload.ongId) && { ongId: payload.ongId },
      ...isValid(payload.ongId) && { ong: new OngEntity({ id: payload.ongId }) },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

  //#endregion

}
