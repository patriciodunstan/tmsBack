import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserActivity } from './entities/user-activity.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';

/**
 * Servicio encargado de la gestión de usuarios y sus operaciones principales.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserActivity)
    private activityRepository: Repository<UserActivity>,
  ) { }

  /**
   * Crea un nuevo usuario, validando que el RUT y el correo no existan previamente.
   * @param createUserDto Datos del usuario a crear
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByRut = await this.usersRepository.findOne({
      where: { rut: createUserDto.rut },
    });
    if (existingUserByRut) {
      throw new ConflictException('User with this RUT already exists');
    }

    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    await this.logActivity(savedUser, 'CREATE', 'User created');
    return savedUser;
  }

  /**
   * Obtiene todos los usuarios registrados.
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Busca un usuario por su RUT.
   * @param rut RUT del usuario
   */
  async findByRut(rut: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { rut },
    });
    if (!user) {
      throw new NotFoundException(`User with RUT ${rut} not found`);
    }
    return user;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email Correo electrónico
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  /**
   * Actualiza los datos de un usuario por su RUT.
   * @param rut RUT del usuario
   * @param updateUserDto Datos a actualizar
   */
  async updateUser(rut: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByRut(rut);
    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'UPDATE', 'User updated');
    return updatedUser;
  }

  /**
   * Elimina un usuario por su RUT.
   * @param rut RUT del usuario
   */
  async removeUser(rut: string): Promise<void> {
    const user = await this.findByRut(rut);
    const result = await this.usersRepository.delete(rut);
    if (result.affected === 0) {
      throw new NotFoundException(`User with RUT ${rut} not found`);
    }
    await this.logActivity(user, 'DELETE', 'User deleted');
  }

  /**
   * Resetea la contraseña de un usuario.
   * @param rut RUT del usuario
   * @param resetPasswordDto Nueva contraseña
   */
  async resetPassword(rut: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.findByRut(rut);
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    await this.logActivity(user, 'RESET_PASSWORD', 'Contraseña reseteada');
  }

  /**
   * Cambia la contraseña de un usuario, validando la contraseña actual.
   * @param rut RUT del usuario
   * @param changePasswordDto Contraseñas actual y nueva
   */
  async changePassword(rut: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findByRut(rut);
    const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    await this.logActivity(user, 'CHANGE_PASSWORD', 'Contraseña cambiada');
  }

  /**
   * Activa un usuario por su RUT.
   * @param rut RUT del usuario
   */
  async activateUser(rut: string): Promise<User> {
    const user = await this.findByRut(rut);
    user.active = true;
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'ACTIVATE', 'User activated');
    return updatedUser;
  }

  /**
   * Desactiva un usuario por su RUT.
   * @param rut RUT del usuario
   */
  async deactivateUser(rut: string): Promise<User> {
    const user = await this.findByRut(rut);
    user.active = false;
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'DEACTIVATE', 'User deactivated');
    return updatedUser;
  }

  /**
   * Registra una actividad realizada por un usuario.
   * @param user Usuario
   * @param action Acción realizada
   * @param details Detalles de la acción
   */
  private async logActivity(user: User, action: string, details: string): Promise<void> {
    const activity = this.activityRepository.create({
      user,
      action,
      details,
    });
    await this.activityRepository.save(activity);
  }
}
