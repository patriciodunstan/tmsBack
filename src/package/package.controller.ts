import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create a new package' })
  @ApiResponse({ status: 201, description: 'The package has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all packages' })
  @ApiResponse({ status: 200, description: 'The packages have been successfully retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.packageService.findAll();
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Get all packages by client id' })
  @ApiResponse({ status: 200, description: 'The packages have been successfully retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('clientId') clientId: string, @Request() req) {

    if (req.user.rol !== UserRole.ADMIN && req.user.id !== +clientId) {
      throw new UnauthorizedException('No tienes permiso para ver este paquete')
    }

    return this.packageService.findByClientId(+clientId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get package by status' })
  @ApiResponse({ status: 200, description: 'The packages have been successfully retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findByStatus(@Param('status') status: PackageStatus) {
    return this.packageService.findByStatus(status);
  }

  @Get('id')
  @ApiOperation({ summary: 'Get package by id' })
  @ApiResponse({ status: 200, description: 'The package has been successfully retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findById(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update package by id' })
  @ApiResponse({ status: 200, description: 'The package has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Package not found' })
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update package status by id' })
  @ApiResponse({ status: 200, description: 'The package status has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Package not found' })
  updateStatus(@Param('id') id: string, @Body('status') status: PackageStatus) {
    return this.packageService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete package by id' })
  @ApiResponse({ status: 200, description: 'The package has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Package not found' })
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
