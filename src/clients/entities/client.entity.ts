import { IsEmail, IsString, IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Package } from "../../packages/entities/package.entity";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'client_name', length: 100 })
    @IsString()
    name: string;

    @Column({ name: 'client_rut', length: 20, unique: true })
    @IsString()
    rut: string;

    @Column({ name: 'client_email', length: 150 })
    @IsEmail()
    @IsOptional()
    email: string;

    @Column({ name: 'client_phone', length: 20 })
    @IsString()
    @IsOptional()
    phone: string;

    @Column({ name: 'client_address', length: 255 })
    @IsString()
    @IsOptional()
    address: string;

    @Column({ name: 'client_favorite_addresses', type: 'json', nullable: true })
    @IsOptional()
    favoriteAddresses: {
        name: string;
        address: string;
        isDefault: boolean;
    }[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Package, package => package.client)
    packages: Package[];
}