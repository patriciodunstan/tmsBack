import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody,
  ApiBearerAuth 
} from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe un cliente con ese email' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Get(':id/packages')
  @ApiOperation({ summary: 'Obtener paquetes de un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de paquetes del cliente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos para acceder a estos datos' })
  async getClientPackages(@Param('id') id: string, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para acceder a estos datos');
    }
    return this.clientsService.getClientPackages(+id);
  }

  @Get(':id/packages/orders')
  @ApiOperation({ summary: 'Obtener paquetes con órdenes de un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de paquetes con órdenes del cliente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos para acceder a estos datos' })
  async getClientPackagesWithOrders(@Param('id') id: string, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para acceder a estos datos');
    }
    return this.clientsService.getClientPackagesWithOrders(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos para modificar estos datos' })
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para modificar estos datos');
    }
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}