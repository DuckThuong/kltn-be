import { Space } from "src/entities/space.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { SpaceType } from "src/entities/spaceType.entity";


@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(Space)
        private readonly spaceRepository: Repository<Space>,
        @InjectRepository(SpaceType)
        private readonly spaceTypeRepository: Repository<SpaceType>,
    ) {}    

    /**s
     * Lấy tất cả loại không gian
     * @returns Tất cả loại không gian
     */
    public async getAllSpaceType(): Promise<SpaceType[]> {
        try {
            return this.spaceTypeRepository.find();
        } catch (error) {
            throw new BadRequestException('Lấy tất cả loại không gian thất bại');
        }
    }
}