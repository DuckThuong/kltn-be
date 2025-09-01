import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controllers/login_register.controller';
import { UserDefault } from 'src/entities/userDefault.entity';
import { UserInformation } from 'src/entities/userInformation.entity';
import { LoginService } from 'src/services/login_register.service';
import { JwtModuleCustom } from '../jwt.module';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDefault, UserInformation]),
    JwtModuleCustom,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtAuthGuard],
  exports: [LoginService, JwtAuthGuard],
})
export class LoginModule {}