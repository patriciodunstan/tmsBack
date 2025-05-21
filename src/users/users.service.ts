import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserActivity } from './entities/user-activity.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserActivity)
    private activityRepository: Repository<UserActivity>,
  ) {}

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

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByRut(rut: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { rut },
    });
    if (!user) {
      throw new NotFoundException(`User with RUT ${rut} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(rut: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByRut(rut);
    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'UPDATE', 'User updated');
    return updatedUser;
  }

  async remove(rut: string): Promise<void> {
    const user = await this.findByRut(rut);
    const result = await this.usersRepository.delete(rut);
    if (result.affected === 0) {
      throw new NotFoundException(`User with RUT ${rut} not found`);
    }
    await this.logActivity(user, 'DELETE', 'User deleted');
  }

  async resetPassword(rut: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.findByRut(rut);
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    await this.logActivity(user, 'RESET_PASSWORD', 'Contraseña reseteada');
  }

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

  async activateUser(rut: string): Promise<User> {
    const user = await this.findByRut(rut);
    user.active = true;
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'ACTIVATE', 'User activated');
    return updatedUser;
  }

  async deactivateUser(rut: string): Promise<User> {
    const user = await this.findByRut(rut);
    user.active = false;
    const updatedUser = await this.usersRepository.save(user);
    await this.logActivity(updatedUser, 'DEACTIVATE', 'User deactivated');
    return updatedUser;
  }

  private async logActivity(user: User, action: string, details: string): Promise<void> {
    const activity = this.activityRepository.create({
      user,
      action,
      details,
    });
    await this.activityRepository.save(activity);
  }
}
