import { Package } from "src/package/entities/package.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('zones')
export class Zone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true, name: 'zone_name' })
    zoneName: string;

    @Column({ type: 'text', nullable: true, name: 'zone_description' })
    zoneDescription: string;

    @Column({ default: true, name: 'zone_active' })
    zoneActive: boolean;

    @Column({ type: 'json', nullable: false, name: 'boundaries' })
    boundaries: {
        postal_codes: string[];
    }

    @Column({ name: 'zone_address' })
    zoneAddress: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @OneToMany(() => Package, (pkg) => pkg.zone)
    packages: Package[];

    // @OneToMany(() => Vehicle, vehicle => vehicle.zone)
    // vehicles: Vehicle[];
}
