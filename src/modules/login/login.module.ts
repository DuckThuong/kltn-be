import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controllers/login.controller';
import { UserDefault } from 'src/entities/userDefault.entity';
import { LoginService } from 'src/services/login.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDefault]),
    JwtModule.register({
      secret: '28072003',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}