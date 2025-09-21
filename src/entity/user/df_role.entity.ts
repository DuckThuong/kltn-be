import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DfUserRole } from "./df_user_role.entity";

@Entity('dto_df_role')
export class DfRole {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    ID: number;

    @Column({ 
        type: 'varchar', 
        length: 50, 
        unique: true,
        name: 'ROLE_CODE'
    })
    ROLE_CODE: string;

    @Column({ 
        type: 'varchar', 
        length: 100,
        name: 'ROLE_NAME'
    })
    ROLE_NAME: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true,
        name: 'ROLE_DES'
    })
    ROLE_DES: string;

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

    @OneToMany(() => DfUserRole, userRole => userRole.role)
    userRoles: DfUserRole[];
}