import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpaceService } from "./spaceService.entity";


@Entity('Space')
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    spaceCd: string;

    @Column({ nullable: false })
    spaceName: string;

    @Column({ nullable: false })
    spaceDescription: string;

    @Column({ nullable: false })
    spaceType: string;

    @Column({ nullable: false })
    spaceImageUrl: string;

    @Column({ nullable: false })
    spacePrice: number;

    @Column({ nullable: false })
    spaceAddress: string;

    @OneToMany(() => SpaceService, spaceService => spaceService.space)
    spaceServices: SpaceService[];

    @Column({ nullable: false })
    spaceLatitude: number;

    @Column({ nullable: false })
    spaceLongitude: number;

    @Column({ nullable: false })
    spaceIsActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({ nullable: false })
    createdUserId: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ nullable: false })
    updatedUserId: string;
    
    @UpdateDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}