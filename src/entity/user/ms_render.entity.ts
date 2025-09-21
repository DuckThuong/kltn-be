
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TbUser } from "./tb_user.entity";

@Entity('dto_ms_render')
export class MsRender {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    ID: number;

    @Column({ 
        type: 'varchar', 
        length: 10, 
        unique: true,
        name: 'GENDER_CODE'
    })
    GENDER_CODE: string;

    @Column({ 
        type: 'varchar', 
        length: 50,
        name: 'GENDER_NAME'
    })
    GENDER_NAME: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true,
        name: 'DESCRIPTION'
    })
    DESCRIPTION: string;

    @CreateDateColumn({ 
        type: 'datetime',
        name: 'CREATED_AT'
    })
    CREATED_AT: Date;

    @UpdateDateColumn({ 
        type: 'datetime',
        name: 'UPDATED_AT'
    })
    UPDATED_AT: Date;

    @OneToMany(() => TbUser, user => user.gender)
    users: TbUser[];
}