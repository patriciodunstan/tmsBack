import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreateAuditLogDto {
    @IsString()
    @IsNotEmpty()
    affected_entity: string;

    @IsString()
    @IsNotEmpty()
    change_type: string;

    @IsObject()
    previous_data: unknown;

    @IsObject()
    new_data: unknown;

    @IsNumber()
    user_id: number;
}
