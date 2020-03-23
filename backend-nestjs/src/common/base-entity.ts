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
  id: number;

  /**
   * Diz quando foi criado essa postagem
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Diz quando foi atualizado essa postagem
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Diz se está ativo
   */
  @Column({ default: true })
  isActive: boolean;

}
