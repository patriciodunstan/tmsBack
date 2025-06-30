import { IsDate, IsString } from "class-validator";

export class CreateRolDto {
    
    @IsString()
    nameRol: string;

    @IsString()
    descriptionRol: string;

    @IsDate()
    createdAt: Date;
}
