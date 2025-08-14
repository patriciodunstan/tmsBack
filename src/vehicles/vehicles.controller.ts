import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo vehículo' })
  @ApiBody({ type: CreateVehicleDto })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Transportista o zona no encontrada' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los vehículos' })
  @ApiResponse({ status: 200, description: 'Lista de vehículos con sus relaciones' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vehículo por ID' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiBody({ type: UpdateVehicleDto })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiResponse({ status: 200, description: 'Vehículo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
