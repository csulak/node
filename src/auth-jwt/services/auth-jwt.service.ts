import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/user/interfaces/UserInterface';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: UserInterface) {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwordHash: string) {
    return bcrypt.compare(newPassword, passwordHash);
  }
}
