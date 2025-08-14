import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateAuditLogDto {
    @IsString()
    @IsNotEmpty()
    affected_entity: string;

    @IsString()
    @IsNotEmpty()
    change_type: string;

    @IsObject()
    @IsOptional()
    previous_data?: Record<string, unknown>;

    @IsObject()
    @IsOptional()
    new_data?: Record<string, unknown>;
}
