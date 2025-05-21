import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsString, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { UserActivity } from './user-activity.entity';

export enum UserRole {
  ADMIN = 'admin',
  LOGISTIC = 'logistic',
  WAREHOUSE = 'warehouse',
  CLIENT = 'client'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsString()
  rut: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: true })
  @IsBoolean()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
    
    @OneToMany(() => UserActivity, activity => activity.user)
    activities: UserActivity[];
}
