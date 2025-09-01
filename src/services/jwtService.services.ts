import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceCustom {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Tạo access token
   * @param payload - Dữ liệu để mã hóa trong token
   * @param expiresIn - Thời gian hết hạn (mặc định: 15 phút)
   * @returns Access token
   */
  async generateAccessToken(payload: any, expiresIn: string = '15m'): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn });
  }

  /**
   * Tạo refresh token
   * @param payload - Dữ liệu để mã hóa trong token
   * @param expiresIn - Thời gian hết hạn (mặc định: 7 ngày)
   * @returns Refresh token
   */
  async generateRefreshToken(payload: any, expiresIn: string = '7d'): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn });
  }

  /**
   * Xác thực và giải mã token
   * @param token - Token cần xác thực
   * @returns Dữ liệu đã giải mã từ token
   */
  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }
  }

  /**
   * Tạo cả access token và refresh token
   * @param payload - Dữ liệu để mã hóa trong token
   * @returns Object chứa access token và refresh token
   */
  async generateTokenPair(payload: any): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload)
    ]);

    return {
      accessToken,
      refreshToken
    };
  }

  /**
   * Làm mới access token từ refresh token
   * @param refreshToken - Refresh token
   * @returns Access token mới
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = await this.verifyToken(refreshToken);
      return this.generateAccessToken(payload);
    } catch (error) {
      throw new Error('Refresh token không hợp lệ');
    }
  }
}
