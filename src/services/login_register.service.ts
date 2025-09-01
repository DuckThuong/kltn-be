import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from 'src/dtos/login_register.dto';
import { UserDefault } from 'src/entities/userDefault.entity';
import { UserInformation } from 'src/entities/userInformation.entity';
import { Repository } from 'typeorm';
import { JwtServiceCustom } from './jwtService.services';

@Injectable()
export class LoginService {
    constructor(
        private readonly userDefaultRepository: Repository<UserDefault>,
        private readonly userInformationRepository: Repository<UserInformation>,
        private readonly jwtService: JwtServiceCustom,
    ) {}

    public async doLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { username, password } = loginDto;
        const userDefault = await this.userDefaultRepository.findOne({ where: { username } });
        
        if (!userDefault) {
            throw new UnauthorizedException('Tài khoản không tồn tại');
        }
        
        if (!userDefault.isActive) {
            throw new UnauthorizedException('Tài khoản đã bị khóa');
        }
        
        if (userDefault.password !== password) {
            throw new UnauthorizedException('Mật khẩu không chính xác');
        }

        const payload = { 
            userCd: userDefault.userCd, 
            username: userDefault.username 
        };
        
        const { accessToken, refreshToken } = await this.jwtService.generateTokenPair(payload);
        
        return { accessToken, refreshToken, isAdmin: userDefault.role === '1' };
    }

    /**
     * Làm mới access token từ refresh token
     * @param refreshToken - Refresh token
     * @returns Access token mới
     */
    public async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            const newAccessToken = await this.jwtService.refreshAccessToken(refreshToken);
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
        }
    }

    /**
     * Xác thực token
     * @param token - Token cần xác thực
     * @returns Thông tin user từ token
     */
    public async validateToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyToken(token);
        } catch (error) {
            throw new UnauthorizedException('Token không hợp lệ');
        }
    }
}
