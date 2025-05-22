import { Controller, Get, Patch, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Get(':id/packages')
  async getClientPackages(@Param('id') id: string, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para acceder a estos datos');
    }
    return this.clientsService.getClientPackages(+id);
  }

  @Get(':id/packages/orders')
  async getClientPackagesWithOrders(@Param('id') id: string, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para acceder a estos datos');
    }
    return this.clientsService.getClientPackagesWithOrders(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Request() req) {
    // Verificar que el usuario sea el propietario del cliente o un administrador
    if (req.user.role !== UserRole.ADMIN && req.user.id !== +id) {
      throw new UnauthorizedException('No tienes permiso para modificar estos datos');
    }
    return this.clientsService.update(+id, updateClientDto);
  }
}