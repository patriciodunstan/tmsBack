import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserActivity } from './users/entities/user-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'tms-mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tms_db',
      entities: [User, UserActivity],
      synchronize: true
    }),
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
