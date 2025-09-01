import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class UserInformation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userCd: string;

    @Column()   
    fullName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    description: string;

    @Column()
    province: string;

    @Column()
    address: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column({ unique: true, length: 12 })
    cmnd: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    gender: string;

    @Column()
    avatar: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}