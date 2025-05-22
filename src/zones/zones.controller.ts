import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('zonas')
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva zona' })
  @ApiResponse({ status: 201, description: 'Zona creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe una zona con ese nombre' })
  createZone(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.createZone(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las zonas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las zonas' })
  findAllZones() {
    return this.zonesService.findAllZones();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una zona por su ID' })
  @ApiResponse({ status: 200, description: 'Zona encontrada' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada' })
  findZoneById(@Param('id') id: string) {
    return this.zonesService.findZoneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una zona' })
  @ApiResponse({ status: 200, description: 'Zona actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada' })
  @ApiResponse({ status: 409, description: 'Ya existe una zona con ese nombre' })
  updateZone(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.updateZone(+id, updateZoneDto);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Cambiar el estado activo de una zona' })
  @ApiResponse({ status: 200, description: 'Estado de la zona cambiado exitosamente' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada' })
  toggleZoneStatus(@Param('id') id: string) {
    return this.zonesService.toggleZoneStatus(+id);
  }

  @Patch(':sourceId/reassign-packages/:targetId')
  @ApiOperation({ summary: 'Reasignar paquetes de una zona a otra' })
  @ApiResponse({ status: 200, description: 'Paquetes reasignados exitosamente' })
  @ApiResponse({ status: 404, description: 'Zona origen o destino no encontrada' })
  reassignZonePackages(
    @Param('sourceId') sourceId: string,
    @Param('targetId') targetId: string
  ) {
    return this.zonesService.reassignZonePackages(+sourceId, +targetId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una zona' })
  @ApiResponse({ status: 200, description: 'Zona eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada' })
  deleteZone(@Param('id') id: string) {
    return this.zonesService.deleteZone(+id);
  }
}
