import { IsEmail, IsString, MinLength, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'RUT del usuario sin puntos y con guión',
        example: '11111111-1'
    })
    @IsString()
    rut: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (mínimo 6 caracteres)',
        example: 'password123'
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Rol del usuario',
        enum: UserRole,
        example: 'admin',
        required: false
    })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @ApiProperty({
        description: 'Estado del usuario',
        example: true,
        required: false,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
