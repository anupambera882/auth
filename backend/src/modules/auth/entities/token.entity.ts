import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.token)
  user: User;
}
