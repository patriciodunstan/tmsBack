import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.activities)
    user: User;

    @Column()
    action: string;

    @Column()
    details: string;

    @CreateDateColumn()
    timestamp: Date;
}