import { Get, Controller } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SpaceType } from "src/entities/spaceType.entity";
import { SpaceService } from "src/services/space.service";

@ApiTags('Space')
@Controller('space')
export class SpaceController {
    constructor(private readonly spaceService: SpaceService) {}

    @Get()
    @ApiOperation({ 
        summary: 'Lấy tất cả loại không gian',
        description: 'Lấy danh sách tất cả các loại không gian có trong hệ thống'
    })
    @ApiResponse({ 
        status: 200, 
        type: SpaceType, 
        isArray: true,
        description: 'Danh sách loại không gian'
    })
    public async getAllSpaceType() {
        return this.spaceService.getAllSpaceType();
    }

}   