import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/decorators/role.decorator';
import { User } from '../auth/entities/user.entity';
import { UserService } from './user.service';
import { response } from '../../shared/interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get('all')
  async findAll(): Promise<response<User[]>> {
    return this.userService.findAll();
  }
}
