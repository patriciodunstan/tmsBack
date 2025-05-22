import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsString, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { UserActivity } from './user-activity.entity';

export enum UserRole {
  ADMIN = 'admin',
  LOGISTICO = 'logistico',
  BODEGA = 'bodega'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', length: 100 })
  @IsString()
  name: string;

  @Column({ name: 'user_rut', length: 20, unique: true })
  @IsString()
  rut: string;

  @Column({ name: 'user_email', length: 150, unique: true })
  @IsEmail()
  email: string;

  @Column({ name: 'user_password', length: 255 })
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    name: 'user_role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ name: 'user_active', default: true })
  @IsBoolean()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserActivity, activity => activity.user)
  activities: UserActivity[];
}
