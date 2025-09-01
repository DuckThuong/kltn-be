import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-here',
    });
  }

  async validate(payload: any) {
    // Kiểm tra thêm thông tin user nếu cần
    if (!payload.userCd) {
      throw new UnauthorizedException('Token không chứa thông tin user hợp lệ');
    }

    return {
      userCd: payload.userCd,
      username: payload.username,
    };
  }
}
