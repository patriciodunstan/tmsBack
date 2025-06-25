import { PartialType } from '@nestjs/swagger';
import { CreateTransportistaDto } from './create-transportista.dto';

export class UpdateTransportistaDto extends PartialType(CreateTransportistaDto) {}
