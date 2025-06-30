import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserActivity } from './users/entities/user-activity.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZonesModule } from './zones/zones.module';
import { ClientsModule } from './clients/clients.module';
import { PackageModule } from './package/package.module';
import { OrdersModule } from './orders/orders.module';
import { TransportistaModule } from './transportista/transportista.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { RolsModule } from './rols/rols.module';

/**
 * Módulo principal de la aplicación.
 * Configura la conexión a la base de datos y carga los módulos de usuarios y autenticación.
 */
@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuración de TypeORM para conectarse a MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, UserActivity],
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ZonesModule,
    ClientsModule,
    PackageModule,
    OrdersModule,
    TransportistaModule,
    VehiclesModule,
    AuditLogsModule,
    RolsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
