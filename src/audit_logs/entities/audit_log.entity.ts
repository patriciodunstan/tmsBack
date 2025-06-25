
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'autit_logs_id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    affected_entity: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    change_type: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    user_id: number;

    @Column({
        type: 'json',
        nullable: true,
    })
    previous_data: Record<string, unknown>;

    @Column({
        type: 'json',
        nullable: true,
    })
    new_data: Record<string, unknown>;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

}
