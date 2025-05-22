import { IsEmail, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsString()
    client_name: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    client_rut: string;

    @Column()
    @IsEmail()
    cliente_email: string;

    @Column()
    @IsString()
    cliente_phone: string;

    @Column()
    @IsString()
    client_adress: string;

    @CreateDateColumn()
    created_at: Date;


    @UpdateDateColumn()
    update_at: Date;
}
