import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateZoneDto {
    @ApiProperty({
        description: 'Nombre de la zona',
        example: 'Zona Norte'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    zone_name: string;

    @ApiProperty({
        description: 'Descripción de la zona',
        example: 'Área de cobertura para la región norte',
        required: false
    })
    @IsOptional()
    @IsString()
    zone_description?: string;
}
