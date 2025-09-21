import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controllers/login_register.controller';
import { LoginService } from 'src/services/login_register.service';
import { JwtModuleCustom } from '../jwt.module';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DfUser } from 'src/entity/user/df_user.entity';
import { DfUserRole } from 'src/entity/user/df_user_role.entity';
import { DfRole } from 'src/entity/user/df_role.entity';
import { MsRender } from 'src/entity/user/ms_render.entity';
import { TbUser } from 'src/entity/user/tb_user.entity';
import { TbPayment } from 'src/entity/tb_payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DfUser, DfUserRole, DfRole, MsRender, TbUser, TbPayment]),
    JwtModuleCustom,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtAuthGuard],
  exports: [LoginService, JwtAuthGuard],
})
export class LoginModule {}