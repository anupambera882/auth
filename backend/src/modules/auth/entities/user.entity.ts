import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @OneToMany(() => Token, (token) => token.user)
  token: Token[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
