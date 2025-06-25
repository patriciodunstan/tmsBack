import { PartialType } from '@nestjs/swagger';
import { CreatePackageDto } from './create-package.dto';
import { IsOptional, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { PackageStatus } from './package-status.dto';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
    @IsOptional()
    @IsEnum(PackageStatus)
    packageStatus: PackageStatus;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    zoneId: number;
}
