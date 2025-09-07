import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpaceDto {
    @ApiProperty({ 
        description: 'Tên không gian',
        example: 'Không gian 1',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}   

export class SpaceResponseDto {
    @ApiProperty({ 
        description: 'ID của không gian',
        example: 1,
        type: 'number'
    })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ 
        description: 'Mã code của loại không gian',
        example: 'OFFICE',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    spaceTypeCd: string;

    @ApiProperty({ 
        description: 'Tên loại không gian',
        example: 'Văn phòng',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    spaceTypeName: string;

    @ApiProperty({ 
        description: 'Mã định danh loại không gian',
        example: 'OFFICE_001',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    spaceTypeCode: string;

    @ApiProperty({ 
        description: 'URL hình ảnh của loại không gian',
        example: 'https://example.com/images/office.jpg',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    spaceTypeImageUrl: string;
    
    @ApiProperty({ 
        description: 'Mô tả chi tiết về loại không gian',
        example: 'Không gian văn phòng hiện đại với đầy đủ tiện nghi',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    spaceTypeDescription: string;

    @ApiProperty({ 
        description: 'Trạng thái hoạt động của loại không gian',
        example: true,
        type: 'boolean'
    })
    @IsBoolean()
    @IsNotEmpty()
    spaceTypeIsActive: boolean;


}