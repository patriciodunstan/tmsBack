import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { Auth } from './entities/auth.entity';

/**
 * Servicio encargado de la lógica de autenticación y generación de tokens.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * Valida las credenciales del usuario.
   * @param email Correo electrónico del usuario
   * @param password Contraseña del usuario
   * @returns Información del usuario si es válido, null si no
   */
  async validateUser(email: string, password: string): Promise<Auth | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { id, email, role, name, rut, active } = user;
      return { id, email, role, name, rut, active };
    }
    return null;
  }

  /**
   * Realiza el proceso de login y retorna un token JWT si las credenciales son correctas.
   * @param loginDto Datos de acceso
   * @returns Token de acceso y datos del usuario
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rut: user.rut
      }
    };
  }
}