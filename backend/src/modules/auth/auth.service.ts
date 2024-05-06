import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommonErrors } from '../../shared/errors/common-errors';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { response } from '../../shared/interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<response<User>> {
    const existing = await this.findByEmail(authRegisterDto.email);

    const user = this.userRepository.create(authRegisterDto);

    if (existing) {
      throw new InternalServerErrorException(CommonErrors.EmailExist);
    }

    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException(CommonErrors.ServerError);
    }

    user.password = undefined;
    return {
      statusCode: 201,
      response: user,
      message: 'register successfully!!!',
    };
  }

  async login(authLoginDto: AuthLoginDto): Promise<response> {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      statusCode: 200,
      response: {
        access_token: this.jwtService.sign(payload),
        user: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          is_active: user.isActive,
          role: ['User', 'Admin'],
        },
      },
      message: 'Sign Up successfully!!',
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException(CommonErrors.Unauthorized);
    }

    return user;
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async getLoggedUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    user.password = undefined;
    return {
      statusCode: 200,
      response: { ...user, role: ['User', 'Admin'] },
      message: 'register successfully!!!',
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const exists = await this.findByEmail(forgotPasswordDto.email);

    if (!exists) {
      throw new NotFoundException(CommonErrors.NotFound);
    } else {
      const user = await this.userRepository.findOne({
        where: {
          email: forgotPasswordDto.email,
        },
      });

      const passwordRand = Math.random().toString(36).slice(-8);

      user.password = bcrypt.hashSync(passwordRand, 8);

      this.sendForgotPasswordMail(user.email, passwordRand);
      return await this.userRepository.save(user);
    }
  }

  private async sendForgotPasswordMail(email, password) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: '/forgot-password',
      context: {
        email: email,
        password: password,
      },
    });
  }
}
