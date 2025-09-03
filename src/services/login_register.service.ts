import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LoginResponseDto, RegisterDto, RegisterResponseDto } from 'src/dtos/login_register.dto';
import { UserDefault } from 'src/entities/userDefault.entity';
import { UserInformation } from 'src/entities/userInformation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtServiceCustom } from './jwtService.services';
import { ADMIN_ROLE, USER_ROLE } from 'src/config/constant';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(UserDefault)
        private readonly userDefaultRepository: Repository<UserDefault>,
        @InjectRepository(UserInformation)
        private readonly userInformationRepository: Repository<UserInformation>,
        private readonly jwtService: JwtServiceCustom,
    ) {}

    /**
     * Đăng nhập
     * @param loginDto - Dữ liệu đăng nhập
     * @returns Thông tin access token và refresh token
     */
    public async doLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
        try {
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
            
            return { accessToken, refreshToken, isAdmin: userDefault.role === ADMIN_ROLE, success: true, message: 'Đăng nhập thành công' };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Đăng ký
     * @param registerDto - Dữ liệu đăng ký
     * @returns Thông tin đăng ký
     */
    public async doRegister(registerDto: RegisterDto): Promise<RegisterResponseDto> {
        try {
            const { username, password, fullName } = registerDto;
            const resgisterUser = await this.userDefaultRepository.findOne({ where: { username } });
            if (resgisterUser) {
                throw new UnauthorizedException('Tài khoản đã tồn tại');
            }
            const userCd = Array.from({length: 12}, () => Math.floor(Math.random() * 10)).join('');
            const userDefault = new UserDefault();
            userDefault.userCd = userCd;
            userDefault.username = username;
            userDefault.password = password;
            userDefault.role = USER_ROLE; 
            userDefault.isActive = true;

            const userInformation = new UserInformation();
            userInformation.userCd = userCd;
            userInformation.fullName = fullName;
            
            await this.userDefaultRepository.save(userDefault);
            await this.userInformationRepository.save(userInformation);
            return { success: true, message: 'Đăng ký thành công' };
        } catch (error) {
            throw error;
        }
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
