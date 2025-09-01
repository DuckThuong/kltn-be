import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceCustom } from '../services/jwtService.services';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
  ],
  providers: [JwtServiceCustom],
  exports: [JwtServiceCustom, JwtModule],
})
export class JwtModuleCustom {}
