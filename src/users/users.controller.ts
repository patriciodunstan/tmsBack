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
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody,
  ApiBearerAuth 
} from '@nestjs/swagger';

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
  @ApiParam({ name: 'rut', description: 'RUT del usuario (ej: 12345678-9)', example: '12345678-9' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByRut(@Param('rut') rut: string) {
    // Sanitizar RUT removiendo comillas si existen
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.findByRut(sanitizedRut);
  }

  /**
   * Actualiza los datos de un usuario por su RUT.
   * @param rut RUT del usuario
   * @param updateUserDto Datos a actualizar
   */
  @Patch(':rut')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  updateUser(@Param('rut') rut: string, @Body() updateUserDto: UpdateUserDto) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.updateUser(sanitizedRut, updateUserDto);
  }

  /**
   * Desactiva un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Patch(':rut/desactivar')
  @ApiOperation({ summary: 'Desactivar un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  desactivateUser(@Param('rut') rut: string) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.deactivateUser(sanitizedRut);
  }

  /**
   * Activa un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Patch(':rut/activar')
  @ApiOperation({ summary: 'Activar un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiResponse({ status: 200, description: 'Usuario activado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  activateUser(@Param('rut') rut: string) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.activateUser(sanitizedRut);
  }

  /**
   * Resetea la contraseña de un usuario.
   * @param rut RUT del usuario
   * @param resetPasswordDto Nueva contraseña
   */
  @Patch(':rut/reset-password')
  @ApiOperation({ summary: 'Resetear contraseña de un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña reseteada exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  resetPassword(@Param('rut') rut: string, @Body() resetPasswordDto: ResetPasswordDto) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.resetPassword(sanitizedRut, resetPasswordDto);
  }

  /**
   * Cambia la contraseña de un usuario.
   * @param rut RUT del usuario
   * @param changePasswordDto Contraseñas actual y nueva
   */
  @Patch(':rut/change-password')
  @ApiOperation({ summary: 'Cambiar contraseña de un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 401, description: 'Contraseña actual incorrecta' })
  changePassword(@Param('rut') rut: string, @Body() changePasswordDto: ChangePasswordDto) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.changePassword(sanitizedRut, changePasswordDto);
  }

  /**
   * Elimina un usuario por su RUT.
   * @param rut RUT del usuario
   */
  @Delete(':rut')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario', example: '12345678-9' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  removeUser(@Param('rut') rut: string) {
    const sanitizedRut = rut.replace(/['"]/g, '');
    return this.usersService.removeUser(sanitizedRut);
  }
}
