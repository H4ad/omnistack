//#region Imports

import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

//#endregion

export class BaseEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column({ default: true })
  public isActive!: boolean;

}
