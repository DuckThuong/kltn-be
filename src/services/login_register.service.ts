import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
} from 'src/dtos/login_register.dto';
import { DfUser } from 'src/entity/user/df_user.entity';
import { DfUserRole } from 'src/entity/user/df_user_role.entity';
import { DfRole } from 'src/entity/user/df_role.entity';
import { MsRender } from 'src/entity/user/ms_render.entity';
import { TbUser } from 'src/entity/user/tb_user.entity';
import { TbPayment } from 'src/entity/tb_payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtServiceCustom } from './jwtService.services';
import { ADMIN_ROLE, USER_ROLE } from 'src/config/constant';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(DfUser)
    private readonly userDefaultRepository: Repository<DfUser>,
    @InjectRepository(DfUserRole)
    private readonly userRoleRepository: Repository<DfUserRole>,
    @InjectRepository(DfRole)
    private readonly roleRepository: Repository<DfRole>,
    @InjectRepository(MsRender)
    private readonly renderRepository: Repository<MsRender>,
    @InjectRepository(TbUser)
    private readonly userRepository: Repository<TbUser>,
    @InjectRepository(TbPayment)
    private readonly paymentRepository: Repository<TbPayment>,
    private readonly jwtService: JwtServiceCustom,
  ) {}

  /**
   * Đăng nhập
   * @param loginDto - Dữ liệu đăng nhập
   * @returns Thông tin access token và refresh token
   */
  public async doLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const userDefault = await this.userDefaultRepository.findOne({
        where: { EMAIL: loginDto.email },
      });

      if (!userDefault) {
        throw new UnauthorizedException('Tài khoản không tồn tại');
      }

      if (!userDefault.IS_ACTIVE) {
        throw new UnauthorizedException('Tài khoản đã bị khóa');
      }

      if (userDefault.PASSWORD_HASH !== loginDto.password) {
        throw new UnauthorizedException('Mật khẩu không chính xác');
      }

      const payload = {
        userCd: userDefault.USER_CD,
        username: userDefault.USERNAME,
      };

      const { accessToken, refreshToken } =
        await this.jwtService.generateTokenPair(payload);

      const userRole = await this.userRoleRepository.find({
        where: { USER_ID: userDefault.ID },
        relations: ['role'],
      });

      return {
        accessToken,
        refreshToken,
        isAdmin: userRole?.some(ur => ur.role?.ROLE_CODE === ADMIN_ROLE) || false,
        success: true,
        message: 'Đăng nhập thành công',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Đăng ký
   * @param registerDto - Dữ liệu đăng ký
   * @returns Thông tin đăng ký
   */
  public async doRegister(
    registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    try {
      const { email, password, fullName } = registerDto;
      const resgisterUser = await this.userDefaultRepository.findOne({
        where: { EMAIL: registerDto.email },
      });
      if (resgisterUser) {
        throw new UnauthorizedException('Tài khoản đã tồn tại');
      }
      const userCd = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 10),
      ).join('');
      const userDefault = new DfUser();
      userDefault.USER_CD = userCd;
      userDefault.EMAIL = registerDto.email;
      userDefault.PASSWORD_HASH = registerDto.password;
      userDefault.IS_ACTIVE = true;
      userDefault.IS_DELETE = false;

      const userRole = await this.roleRepository.findOne({
        where: { ROLE_CODE: USER_ROLE }
      });

      if (!userRole) {
        throw new UnauthorizedException('Role không tồn tại');
      }

      await this.userDefaultRepository.save(userDefault);

      const userRoleRelation = new DfUserRole();
      userRoleRelation.USER_ID = userDefault.ID;
      userRoleRelation.ROLE_ID = userRole.ID;
      await this.userRoleRepository.save(userRoleRelation);
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
  public async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const newAccessToken =
        await this.jwtService.refreshAccessToken(refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
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
