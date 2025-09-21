import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DfUserRole } from './df_user_role.entity';
import { TbUser } from './tb_user.entity';
import { TbPayment } from '../tb_payment.entity';

@Entity('dto_df_user')
export class DfUser {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ID: number;

  @Column({
    type: 'varchar',
    length: 15,
    unique: true,
    name: 'USER_CD',
  })
  USER_CD: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    name: 'USERNAME',
  })
  USERNAME: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'PASSWORD_HASH',
  })
  PASSWORD_HASH: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    unique: true,
    name: 'EMAIL',
  })
  EMAIL: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    name: 'FULL_NAME',
  })
  FULL_NAME: string;

  @Column({
    type: 'tinyint',
    default: 1,
    name: 'STATUS',
  })
  STATUS: number;

  @Column({
    type: 'bit',
    default: true,
    name: 'IS_ACTIVE',
  })
  IS_ACTIVE: boolean;

  @Column({
    type: 'bit',
    default: true,
    name: 'IS_DELETE',
  })
  IS_DELETE: boolean;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'LAST_LOGIN_AT',
  })
  LAST_LOGIN_AT: Date;

  @CreateDateColumn({
    type: 'datetime',
    name: 'CREATED_AT',
  })
  CREATED_AT: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'UPDATED_AT',
  })
  UPDATED_AT: Date;

  @OneToMany(() => DfUserRole, (userRole) => userRole.user)
  userRoles: DfUserRole[];

  @OneToOne(() => TbUser, (profile) => profile.user)
  profile: TbUser;

  @OneToMany(() => TbPayment, (payment) => payment.user)
  payments: TbPayment[];
}
