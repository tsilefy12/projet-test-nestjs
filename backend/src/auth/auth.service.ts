import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { Auth } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
 
  async create(createAuthDto: CreateAuthDto){
    try {
      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.prisma.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
    return user;
    } catch (error) {
      return error;
    }
  }

  async findByUsername(username: string) {
    const user = await this.prisma.auth.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async login(username: string){
    const payload = { username: username }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string) {
    const user = await this.findByUsername(username);
    if (user) {  
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async getConnectedUser(jwtToken) {
    try {
      const payload = this.jwtService.verify(jwtToken);
      const user = await this.prisma.auth.findUnique(payload.sub);
      // delete user.password;
      return user;
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        throw new UnauthorizedException('invalid token');
      }
      throw error;
    }
  }
}
