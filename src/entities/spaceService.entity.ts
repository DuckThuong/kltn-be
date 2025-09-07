import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Space } from "./space.entity";

@Entity('SpaceService')
export class SpaceService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    spaceServiceCd: string;
    
    @Column({ nullable: false })
    spaceServiceName: string;

    @Column({ nullable: false })
    spaceServiceIcon: string;

    @Column({ nullable: false })
    spaceServiceDescription: string;

    @Column({ nullable: false })
    spaceServiceIsActive: boolean;

    @Column({ nullable: false })
    spaceId: number;

    @ManyToOne(() => Space, space => space.spaceServices)
    @JoinColumn({ name: 'spaceId' })
    space: Space;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}