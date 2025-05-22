import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('zones')
export class Zone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    zone_name: string;

    @Column({ type: 'text', nullable: true })
    zone_description: string;

    @Column({ default: true })
    zone_active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    // @OneToMany(() => Package, package => package.zone)
    // packages: Package[];

    // @OneToMany(() => Vehicle, vehicle => vehicle.zone)
    // vehicles: Vehicle[];
}
