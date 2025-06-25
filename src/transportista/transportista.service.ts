import { Injectable } from '@nestjs/common';
import { CreateTransportistaDto } from './dto/create-transportista.dto';
import { UpdateTransportistaDto } from './dto/update-transportista.dto';

@Injectable()
export class TransportistaService {
  create(createTransportistaDto: CreateTransportistaDto) {
    return 'This action adds a new transportista';
  }

  findAll() {
    return `This action returns all transportista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportista`;
  }

  update(id: number, updateTransportistaDto: UpdateTransportistaDto) {
    return `This action updates a #${id} transportista`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportista`;
  }
}
