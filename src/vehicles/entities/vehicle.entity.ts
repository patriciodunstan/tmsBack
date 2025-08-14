import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transportista } from 'src/transportista/entities/transportista.entity';
import { Zone } from 'src/zones/entities/zone.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ length: 20, unique: true })
  plate: string;

  @Column({ type: 'enum', enum: ['truck', 'van', 'pickup', 'motorcycle'] })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  load_capacity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  width: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  length: number;

  @ManyToOne(() => Transportista, (transportista) => transportista.vehicles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  transportista: Transportista;

  @ManyToOne(() => Zone, (zone) => zone.vehicles, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  zone: Zone;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
