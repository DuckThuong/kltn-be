

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceController } from 'src/controllers/space.controller';
import { Space } from 'src/entities/space.entity';
import { SpaceType } from 'src/entities/spaceType.entity';
import { SpaceService } from 'src/services/space.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Space, SpaceType, SpaceService]),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}