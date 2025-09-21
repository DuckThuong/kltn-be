import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { DfUser } from "./user/df_user.entity";

@Entity('dto_tb_payment')
export class TbPayment {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    ID: number;

    @Column({ 
        type: 'bigint',
        name: 'USER_ID'
    })
    USER_ID: number;

    @Column({ 
        type: 'varchar', 
        length: 50,
        name: 'PAYMENT_TYPE'
    })
    PAYMENT_TYPE: string;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'PROVIDER'
    })
    PROVIDER: string;

    @Column({ 
        type: 'varchar', 
        length: 100, 
        nullable: true,
        name: 'ACCOUNT_NUMBER'
    })
    ACCOUNT_NUMBER: string;

    @Column({ 
        type: 'varchar', 
        length: 150, 
        nullable: true,
        name: 'ACCOUNT_NAME'
    })
    ACCOUNT_NAME: string;

    @Column({ 
        type: 'varchar', 
        length: 10, 
        nullable: true,
        name: 'EXPIRY_DATE'
    })
    EXPIRY_DATE: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true,
        name: 'BILLING_ADDRESS'
    })
    BILLING_ADDRESS: string;

    @Column({ 
        type: 'tinyint', 
        default: 0,
        name: 'IS_DEFAULT'
    })
    IS_DEFAULT: number;

    @Column({ 
        type: 'tinyint', 
        default: 1,
        name: 'STATUS'
    })
    STATUS: number;

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

    @ManyToOne(() => DfUser, user => user.payments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'USER_ID' })
    user: DfUser;
}