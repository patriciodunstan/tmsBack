import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiParam, 
  ApiBody 
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { PackageStatus } from './dto/package-status.dto';

@ApiTags('Package')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paquete' })
  @ApiBody({ type: CreatePackageDto })
  @ApiResponse({ status: 201, description: 'Paquete creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Cliente o zona no encontrada' })
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los paquetes' })
  @ApiResponse({ status: 200, description: 'Lista de paquetes obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paquete por ID' })
  @ApiParam({ name: 'id', description: 'ID del paquete', example: 1 })
  @ApiResponse({ status: 200, description: 'Paquete encontrado' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findById(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Obtener todos los paquetes de un cliente' })
  @ApiParam({ name: 'clientId', description: 'ID del cliente', example: 1 })
  @ApiResponse({ status: 200, description: 'Paquetes del cliente obtenidos exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos para ver estos paquetes' })
  findByClient(@Param('clientId') clientId: string, @Request() req) {
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +clientId) {
      throw new UnauthorizedException('No tienes permiso para ver estos paquetes')
    }
    return this.packageService.findByClientId(+clientId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Obtener paquetes por estado' })
  @ApiParam({ name: 'status', description: 'Estado del paquete', enum: PackageStatus })
  @ApiResponse({ status: 200, description: 'Paquetes obtenidos exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByStatus(@Param('status') status: PackageStatus) {
    return this.packageService.findByStatus(status);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un paquete' })
  @ApiParam({ name: 'id', description: 'ID del paquete', example: 1 })
  @ApiBody({ type: UpdatePackageDto })
  @ApiResponse({ status: 200, description: 'Paquete actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o paquete no está pendiente' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de un paquete' })
  @ApiParam({ name: 'id', description: 'ID del paquete', example: 1 })
  @ApiResponse({ status: 200, description: 'Estado del paquete actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Estado inválido' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  updateStatus(@Param('id') id: string, @Body('status') status: PackageStatus) {
    return this.packageService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paquete' })
  @ApiParam({ name: 'id', description: 'ID del paquete', example: 1 })
  @ApiResponse({ status: 200, description: 'Paquete eliminado exitosamente' })
  @ApiResponse({ status: 400, description: 'Paquete no está pendiente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
