import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transportista')
export class Transportista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    rut: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.transportista)
    vehicles: Vehicle[];

}
