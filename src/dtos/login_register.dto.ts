import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: 'Tên đăng nhập của người dùng' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Mật khẩu của người dùng' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({ description: 'Access Token' })
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @ApiProperty({ description: 'Refresh Token' })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
    
    @ApiProperty({ description: 'Quyền của người dùng' })
    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean;

    @ApiProperty({ description: 'Thông báo' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ description: 'Thành công' })
    @IsBoolean()
    @IsNotEmpty()
    success: boolean;
}

export class RegisterDto {
    @ApiProperty({ description: 'Tên người dùng' })
    @IsString()
    @IsNotEmpty()
    fullName: string;
    
    @ApiProperty({ description: 'Tên đăng nhập của người dùng' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Mật khẩu của người dùng' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RegisterResponseDto {
    @ApiProperty({ description: 'Thông báo' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ description: 'Thành công' })
    @IsBoolean()
    @IsNotEmpty()
    success: boolean;
}   

export class RefreshTokenResponseDto {
    @ApiProperty({ description: 'Access Token mới' })
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}

export class GetProfileResponseDto {
    @ApiProperty({ description: 'Thông báo' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'Thông tin user', type: 'object' })
    user: {
        userCd: string;
        username: string;
    };
}

export class ValidateTokenResponseDto {
    @ApiProperty({ description: 'Thông báo' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'Thông tin user', type: 'object' })
    user: {
        userCd: string;
        username: string;
    };
}