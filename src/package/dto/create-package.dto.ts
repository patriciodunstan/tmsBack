import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePackageDto {
    @IsNumber()
    @IsPositive()
    packagePrice: number;

    @IsNumber()
    @IsPositive()
    packageWeight: number;

    @IsNumber()
    @IsPositive()
    packageWidth: number;

    @IsNumber()
    @IsPositive()
    packageHeight: number;

    @IsNumber()
    @IsPositive()
    packageDeclaredValue: number;

    @IsString()
    @IsNotEmpty()
    packagePickupAddress: string;

    @IsString()
    @IsNotEmpty()
    packageDeliveryAddress: string;

    @IsDate()
    @IsNotEmpty()
    packagePickupDate: Date;

    @IsNumber()
    @IsPositive()
    clientId: number;

    @IsNumber()
    @IsPositive()
    zoneId: number;

}
