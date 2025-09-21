
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { DfUser } from "./df_user.entity";
import { MsRender } from "./ms_render.entity";

@Entity('dto_tb_user')
export class TbUser {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    ID: number;

    @Column({ 
        type: 'bigint',
        name: 'USER_ID'
    })
    USER_ID: number;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'FIRST_NAME'
    })
    FIRST_NAME: string;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'LAST_NAME'
    })
    LAST_NAME: string;

    @Column({ 
        type: 'varchar', 
        length: 200, 
        nullable: true,
        name: 'FULL_NAME'
    })
    FULL_NAME: string;

    @Column({ 
        type: 'bigint', 
        nullable: true,
        name: 'GENDER_ID'
    })
    GENDER_ID: number;

    @Column({ 
        type: 'date', 
        nullable: true,
        name: 'DATE_OF_BIRTH'
    })
    DATE_OF_BIRTH: Date;

    @Column({ 
        type: 'varchar', 
        length: 20, 
        nullable: true,
        name: 'PHONE_NUMBER'
    })
    PHONE_NUMBER: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true,
        name: 'ADDRESS'
    })
    ADDRESS: string;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'CITY'
    })
    CITY: string;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'COUNTRY'
    })
    COUNTRY: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true,
        name: 'AVATAR_URL'
    })
    AVATAR_URL: string;

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

    @ManyToOne(() => DfUser, user => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'USER_ID' })
    user: DfUser;

    @ManyToOne(() => MsRender, gender => gender.users, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'GENDER_ID' })
    gender: MsRender;
}