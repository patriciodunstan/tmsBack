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
  @ApiResponse({ status: 409, description: 'Ya existe un usuario con ese RUT o email' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Obtiene todos los usuarios registrados.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAllUser() {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Get(':rut')
  @ApiOperation({ summary: 'Obtener un usuario por su RUT' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByRut(@Param('rut') rut: string) {
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
  updateUser(@Param('rut') rut: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(rut, updateUserDto);
  }

  /**
   * Desactiva un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Patch(':rut/desactivar')
  @ApiOperation({ summary: 'Desactivar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  desactivateUser(@Param('rut') rut: string) {
    return this.usersService.deactivateUser(rut);
  }

  /**
   * Elimina un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Delete(':rut')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  removeUser(@Param('rut') rut: string) {
    return this.usersService.removeUser(rut);
  }
}
