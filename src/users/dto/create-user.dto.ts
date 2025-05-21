import { IsEmail, IsString, MinLength, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    rut: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
