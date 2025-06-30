import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rols')
export class Rol {
    @PrimaryGeneratedColumn({name: 'id_rol'})
    id: number;

    @Column({name: 'name_rol', length: 50})
    nameRol: string;

    @Column({name: 'description_rol', type: 'text', nullable: true})
    descriptionRol: string;

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
