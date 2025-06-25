import { Package } from "src/package/entities/package.entity";
import { Transportista } from "src/transportista/entities/transportista.entity";
import { User } from "src/users/entities/user.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Zone } from "src/zones/entities/zone.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'pending',
    ASSIGNED = 'assigned',
    READY = 'ready',
    IN_TRANSIT = 'in_transit',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
    RETURNED = 'returned',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderNumber: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @ManyToOne(() => User, { eager: true })
    CreaterdBy: User;

    @ManyToOne(() => Zone, { eager: true })
    zone: Zone;

    @ManyToOne(() => Transportista, { eager: true, nullable: true })
    transportista: Transportista;

    @ManyToOne(() => Vehicle, { eager: true, nullable: true })
    vehicle: Vehicle;

    @OneToMany(() => Package, pkg => pkg.order)
    package: Package[];

    @Column({
        type: 'datetime',
        nullable: true
    })
    assignedAt: Date;

    @Column({
        type: 'datetime',
        nullable: true
    })
    readyAt: Date;

    @Column({
        type: 'datetime',
        nullable: true
    })
    deliveredAt: Date;

    @Column({
        type: 'text',
        nullable: true
    })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
