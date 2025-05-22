import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
/**
 * Controlador encargado de la gestión de usuarios.
 */
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Crea un nuevo usuario.
   * @param createUserDto Datos del usuario a crear
   */
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Conflicto: RUT o correo ya existe' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Obtiene todos los usuarios registrados.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Get(':rut')
  @ApiOperation({ summary: 'Obtener un usuario por RUT' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('rut') rut: string) {
    return this.usersService.findByRut(rut);
  }

  /**
   * Actualiza los datos de un usuario por su RUT.
   * @param rut RUT del usuario
   * @param updateUserDto Datos a actualizar
   */
  @Patch(':rut')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('rut') rut: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(rut, updateUserDto);
  }

  /**
   * Desactiva un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Patch(':rut/desactivar')
  desactivate(@Param('rut') rut: string) {
    return this.usersService.update(rut, { active: false });
  }

  /**
   * Elimina un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Delete(':rut')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('rut') rut: string) {
    return this.usersService.remove(rut);
  }
}
