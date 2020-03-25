//#region Imports

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PaginationOptions } from '../../../common/pagination.options';
import { TypeOrmValueTypes } from '../../../common/type-orm-value.types';
import { OngEntity } from '../../../typeorm/entities/ong.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { isValid } from '../../../utils/functions';
import { CreateOngPayload } from '../models/create-ong.payload';
import { UpdateOngPayload } from '../models/update-ong.payload';

//#endregion

/**
 * A classe que representa o serviço que lida com as ongs
 */
@Injectable()
export class OngService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(OngEntity)
    private readonly repository: Repository<OngEntity>,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias ongs cadastradas no banco de dados
   *
   * @param options As opções ao buscar várias ongs
   */
  public async getMany(options?: PaginationOptions): Promise<OngEntity[]> {
    const { limit = 15, page = 1, relations =  [] } = options;

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

    return query.getMany();
  }

  /**
   * Método que retorna uma ong pela sua identificação
   *
   * @param ongId A identificação da ong
   */
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

  /**
   * Método que cria uma nova entidade
   *
   * @param payload As informações para a criação da entidade
   */
  public async createOne(payload: CreateOngPayload): Promise<OngEntity> {
    const ong = this.getEntityFromPayload(payload);

    return await this.repository.save(ong);
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param ongId A identificação da ong
   * @param payload As informações para a criação da entidade
   */
  public async updateOne(ongId: number, payload: UpdateOngPayload): Promise<OngEntity> {
    const isOngExists = await this.exists(ongId);

    if (!isOngExists)
      throw new NotFoundException('A ong que você deseja atualizar não existe.');

    const ong = this.getEntityFromPayload(payload, ongId);

    return await this.repository.save(ong);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que verifica se existe uma certa ong
   *
   * @param ongId A identificação da ong
   */
  private async exists(ongId: number): Promise<boolean> {
    return await this.repository.createQueryBuilder('ong')
      .where('ong.id = :ongId', { ongId })
      .getCount()
      .then(count => count > 0);
  }

  /**
   * Método que retorna as informações de uma entidade a partir das informações do payload
   *
   * @param payload As informações do payload
   * @param entityId A identificação da entidade
   */
  private getEntityFromPayload(payload: CreateOngPayload | UpdateOngPayload, entityId?: number): OngEntity {
    return new OngEntity({
      ...isValid(entityId) && { id: entityId },
      ...isValid(payload.name) && { name: payload.name },
      ...isValid(payload.city) && { city: payload.city },
      ...isValid(payload.uf) && { uf: payload.uf },
      ...isValid(payload.whatsapp) && { whatsapp: payload.whatsapp },
      ...payload instanceof CreateOngPayload && { user: new UserEntity({ id: payload.userId }) },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

  //#endregion

}
