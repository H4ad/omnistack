//#region Imports

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PaginationOptions } from '../../../common/pagination.options';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { IncidentEntity } from '../../../typeorm/entities/incident.entity';
import { OngEntity } from '../../../typeorm/entities/ong.entity';
import { isValid } from '../../../utils/functions';
import { OngService } from '../../ong/services/ong.service';
import { CreateIncidentPayload } from '../models/create-incident.payload';

//#endregion

/**
 * A classe que representa o serviço que lida com os incidentes de uma ong
 */
@Injectable()
export class IncidentService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly repository: Repository<IncidentEntity>,
    private readonly ongService: OngService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna vários incidentes cadastrados no banco de dados
   *
   * @param options As opções de paginação
   */
  public async getMany(options?: PaginationOptions): Promise<IncidentEntity[]> {
    const { limit = 15, page = 1, relations =  [] } = options;

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    let query = this.repository.createQueryBuilder('incident')
      .where('incident.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE })
      .limit(normalizedLimit)
      .offset((normalizedPage - 1) * limit);

    if (relations.some(relation => relation === 'ong'))
      query = query.leftJoinAndSelect('incident.ong', 'ong', 'ong.isActive = :isActive', { isActive: TypeOrmValueTypes.TRUE });

    return query.getMany();
  }

  /**
   * Método que retorna uma entidade pela sua identificação
   *
   * @param entityId A identificação da entidade
   */
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

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  public async createOne(payload: CreateIncidentPayload): Promise<IncidentEntity> {
    const incident = this.getEntityFromPayload(payload);
    const isOngExist = await this.ongService.exists(incident.ongId);

    if (!isOngExist)
      throw new NotFoundException('A ong na qual você deseja cadastrar esse incidente não existe ou está desativada.');

    return await this.repository.save(incident);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que retorna as informações de uma entidade a partir das informações do payload
   *
   * @param payload As informações do payload
   * @param entityId A identificação da entidade
   */
  private getEntityFromPayload(payload: CreateIncidentPayload, entityId?: number): IncidentEntity {
    return new IncidentEntity({
      ...isValid(entityId) && { id: entityId },
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
