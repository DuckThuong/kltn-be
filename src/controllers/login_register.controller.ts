import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { LoginService } from 'src/services/login_register.service';
import { LoginDto, LoginResponseDto, RefreshTokenResponseDto, GetProfileResponseDto, ValidateTokenResponseDto } from 'src/dtos/login_register.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginDto })  
  @ApiResponse({ status: 200, type: LoginResponseDto })   
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.loginService.doLogin(loginDto);
  }

  @ApiOperation({ summary: 'Làm mới token' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  @Post('refresh')
  public async refreshToken(@Body('refreshToken') refreshToken: string): Promise<RefreshTokenResponseDto> {
    return this.loginService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin user' })
  @ApiResponse({ status: 200, type: GetProfileResponseDto })
  public async getProfile(@Request() req) {
    return {
      message: 'Thông tin user',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  @ApiOperation({ summary: 'Xác thực token' })
  @ApiResponse({ status: 200, type: ValidateTokenResponseDto })
  public async validateToken(@Request() req) {
    return {
      message: 'Token hợp lệ',
      user: req.user,
    };
  }
}
