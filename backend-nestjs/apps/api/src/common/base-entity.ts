//#region Imports

import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

//#endregion

/**
 * A classe base para as entidades
 */
export class BaseEntity {

  /**
   * A identificação do post
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  /**
   * Diz quando foi criado essa postagem
   */
  @CreateDateColumn()
  public createdAt!: Date;

  /**
   * Diz quando foi atualizado essa postagem
   */
  @UpdateDateColumn()
  public updatedAt!: Date;

  /**
   * Diz se está ativo
   */
  @Column({ default: true })
  public isActive!: boolean;

}
