# Hướng dẫn tích hợp JWT

## Tổng quan
Dự án đã được tích hợp JWT (JSON Web Token) để xác thực và phân quyền người dùng.

## Cấu trúc JWT

### 1. JWT Service (`src/services/jwtService.services.ts`)
- `generateAccessToken()`: Tạo access token (hết hạn sau 15 phút)
- `generateRefreshToken()`: Tạo refresh token (hết hạn sau 7 ngày)
- `generateTokenPair()`: Tạo cả access token và refresh token
- `verifyToken()`: Xác thực token
- `refreshAccessToken()`: Làm mới access token từ refresh token

### 2. JWT Module (`src/modules/jwt.module.ts`)
- Cấu hình JWT với secret key và options
- Export JwtServiceCustom để sử dụng trong các module khác

### 3. JWT Guard (`src/guards/jwt-auth.guard.ts`)
- Bảo vệ các routes yêu cầu xác thực
- Tự động extract token từ Authorization header
- Thêm thông tin user vào request object

### 4. JWT Strategy (`src/strategies/jwt.strategy.ts`)
- Strategy cho Passport JWT
- Validate token và extract thông tin user

## API Endpoints

### 1. Đăng nhập
```http
POST /auth/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Làm mới token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Lấy thông tin profile (yêu cầu xác thực)
```http
GET /auth/profile
Authorization: Bearer your_access_token
```

**Response:**
```json
{
  "message": "Thông tin user",
  "user": {
    "userCd": "user_code",
    "username": "username"
  }
}
```

### 4. Xác thực token
```http
POST /auth/validate
Authorization: Bearer your_access_token
```

**Response:**
```json
{
  "message": "Token hợp lệ",
  "user": {
    "userCd": "user_code",
    "username": "username"
  }
}
```

## Cách sử dụng JWT Guard

### Bảo vệ một route:
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get('data')
  getProtectedData(@Request() req) {
    // req.user chứa thông tin user từ token
    return { user: req.user };
  }
}
```

### Bảo vệ toàn bộ controller:
```typescript
@UseGuards(JwtAuthGuard)
@Controller('protected')
export class ProtectedController {
  // Tất cả routes trong controller này đều yêu cầu xác thực
}
```

## Cấu hình

### 1. JWT Secret
Tạo file `.env` trong root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### 2. Cấu hình trong `src/config/jwt.config.ts`
```typescript
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default-secret',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
```

## Bảo mật

1. **JWT Secret**: Luôn sử dụng secret key mạnh và bảo mật
2. **Token Expiration**: Access token có thời gian hết hạn ngắn (15 phút)
3. **Refresh Token**: Sử dụng refresh token để làm mới access token
4. **HTTPS**: Luôn sử dụng HTTPS trong production
5. **Token Storage**: Lưu trữ token an toàn ở client (httpOnly cookies hoặc secure storage)

## Lưu ý

- Access token hết hạn sau 15 phút
- Refresh token hết hạn sau 7 ngày
- Token được lưu trong database khi user đăng nhập
- Sử dụng Bearer token trong Authorization header
- JWT payload chứa `userCd` và `username`
