import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiBearerAuth 
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
/**
 * Controlador encargado de la autenticación de usuarios.
 */
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Endpoint para iniciar sesión.
   * Requiere credenciales válidas y retorna un token JWT si son correctas.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', description: 'JWT token' },
        user: { 
          type: 'object',
          properties: {
            id: { type: 'number' },
            rut: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['ADMIN', 'LOGISTICO', 'BODEGA'] }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Endpoint para obtener el perfil del usuario autenticado.
   * Requiere un token JWT válido.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        rut: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'string', enum: ['ADMIN', 'LOGISTICO', 'BODEGA'] },
        active: { type: 'boolean' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  getProfile(@Request() req) {
    return req.user;
  }
}