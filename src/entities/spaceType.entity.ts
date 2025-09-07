import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('SpaceType')
export class SpaceType {
    @ApiProperty({ 
        description: 'ID của loại không gian',
        example: 1,
        type: 'number'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ 
        description: 'Mã code của loại không gian',
        example: 'OFFICE',
        type: 'string'
    })
    @Column({ nullable: false })
    spaceTypeCd: string;

    @ApiProperty({ 
        description: 'Tên loại không gian',
        example: 'Văn phòng',
        type: 'string'
    })
    @Column({ nullable: false })
    spaceTypeName: string;

    @ApiProperty({ 
        description: 'Mã định danh loại không gian',
        example: 'OFFICE_001',
        type: 'string'
    })
    @Column({ nullable: false })
    spaceTypeCode: string;

    @ApiProperty({ 
        description: 'URL hình ảnh của loại không gian',
        example: 'https://example.com/images/office.jpg',
        type: 'string'
    })
    @Column({ nullable: false })
    spaceTypeImageUrl: string;

    @ApiProperty({ 
        description: 'Mô tả chi tiết về loại không gian',
        example: 'Không gian văn phòng hiện đại với đầy đủ tiện nghi',
        type: 'string'
    })
    @Column({ nullable: false })
    spaceTypeDescription: string;

    @ApiProperty({ 
        description: 'Trạng thái hoạt động của loại không gian',
        example: true,
        type: 'boolean'
    })
    @Column({ nullable: false })
    spaceTypeIsActive: boolean;

    @ApiProperty({ 
        description: 'Thời gian tạo',
        example: '2024-01-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ApiProperty({ 
        description: 'Thời gian cập nhật cuối',
        example: '2024-01-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ApiProperty({ 
        description: 'Thời gian xóa (soft delete)',
        example: '2024-01-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time',
        nullable: true
    })
    @UpdateDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}