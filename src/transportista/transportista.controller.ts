import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportistaService } from './transportista.service';
import { CreateTransportistaDto } from './dto/create-transportista.dto';
import { UpdateTransportistaDto } from './dto/update-transportista.dto';

@Controller('transportista')
export class TransportistaController {
  constructor(private readonly transportistaService: TransportistaService) {}

  @Post()
  create(@Body() createTransportistaDto: CreateTransportistaDto) {
    return this.transportistaService.create(createTransportistaDto);
  }

  @Get()
  findAll() {
    return this.transportistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportistaDto: UpdateTransportistaDto) {
    return this.transportistaService.update(+id, updateTransportistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportistaService.remove(+id);
  }
}
