import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { response } from '../../shared/interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<response<User[]>> {
    const users = await this.userRepository.find();
    return {
      statusCode: 200,
      response: users,
      message: '',
    };
  }
}
