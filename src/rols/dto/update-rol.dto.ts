import { PartialType } from '@nestjs/swagger';
import { CreateRolDto } from './create-rol.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {

    @IsString()
    @IsOptional()
    nameRol?: string;

    @IsString()
    @IsOptional()
    descriptionRol?: string;

    @IsDate()
    updateAt: Date;
}
