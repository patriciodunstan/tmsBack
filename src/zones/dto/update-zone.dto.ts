import { PartialType } from '@nestjs/swagger';
import { CreateZoneDto } from './create-zone.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateZoneDto extends PartialType(CreateZoneDto) {
    @ApiProperty({
        description: 'Estado activo de la zona',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    zone_active?: boolean;
}
