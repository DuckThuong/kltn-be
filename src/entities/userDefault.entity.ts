import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class UserDefault {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 12 })
    userCd: string;

    @Column()
    role: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}   