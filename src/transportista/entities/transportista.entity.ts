import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transportista')
export class Transportista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    rut: string;

}
