import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PackageStatus } from "../dto/package-status.dto";
import { Client } from "src/clients/entities/client.entity";
import { Zone } from "src/zones/entities/zone.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity('package')
export class Package {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_price' })
    packagePrice: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_height' })
    packageHeight: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_width' })
    packageWidth: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_length' })
    packageLength: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_weight' })
    packageWeight: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'package_declared_value' })
    packageDeclaredValue: number;

    @Column({ name: 'package_pickup_address', length: 255 })
    packagePickupAddress: string;

    @Column({ name: 'package_delivery_address', length: 255 })
    packageDeliveryAddress: string;

    @Column({ name: 'package_pickup_date' })
    packagePickupDate: Date;

    @Column({
        type: 'enum',
        enum: PackageStatus,
        default: PackageStatus.PENDING
    })
    packageStatus: PackageStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => Zone, (zone) => zone.packages)
    zone: Zone;

    @ManyToOne(() => Order, order => order.package)
    order: Order;

}
