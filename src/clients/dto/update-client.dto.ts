import { IsEmail, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FavoriteAddressDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsOptional()
    isDefault?: boolean;
}

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FavoriteAddressDto)
    @IsOptional()
    favoriteAddresses?: FavoriteAddressDto[];
}