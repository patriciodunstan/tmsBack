import { IsString, IsNumber, IsEnum, IsOptional, IsPositive, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsString()
  plate: string;

  @IsEnum(['truck', 'van', 'pickup', 'motorcycle'])
  type: string;

  @IsNumber()
  @IsPositive()
  load_capacity: number;

  @IsNumber()
  @IsPositive()
  height: number;

  @IsNumber()
  @IsPositive()
  width: number;

  @IsNumber()
  @IsPositive()
  length: number;

  @IsNumber()
  transportista_id: number;

  @IsOptional()
  @IsNumber()
  zone_id?: number;
}
