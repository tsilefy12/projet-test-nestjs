import { Controller, Get, Post, Body, Param, NotFoundException, UnauthorizedException, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUserConnectedDto } from './dto/get-user-connected.dto';

@Controller('auth')
@ApiTags('Authentification')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard('jwt')) 
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto.username);
  }
  @Get(':username')
  @UseGuards(AuthGuard('jwt')) 
  async findOne(@Param('username') username: string) {
    return await this.authService.findByUsername(username);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)  
  async getMe(@Body() payload: GetUserConnectedDto) {
    return await this.authService.getConnectedUser(payload.jwtToken);
  }
  
}