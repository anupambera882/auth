import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../shared/decorators/auth-user.decorator';
import { response } from '../../shared/interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(
    @Body() authRegisterDto: AuthRegisterDto,
  ): Promise<response<User>> {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto): Promise<response> {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getLoggedUser(@AuthUser() user: any) {
    return this.authService.getLoggedUser(user.userId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
