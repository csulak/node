import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthJwtService } from 'src/auth-jwt/services/auth-jwt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserEntity } from './entity/userEntity';
import { UserInterface } from './interfaces/UserInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authJwtService: AuthJwtService,
  ) {}

  async getUsers(): Promise<UserInterface[]> {
    const usersList = await this.userRepository.find();

    usersList.forEach((user) => {
      delete user.password;
    });
    return usersList;
  }

  async getUser(id: string): Promise<UserInterface> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      delete user.password;
      return user;
    } else {
      throw new NotFoundException(`Could not find user =( with id: ${id}`);
    }
  }

  async createUser(user: CreateUserDto) {
    const passHashed = await this.authJwtService.hashPassword(user.password);

    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.password = passHashed;

    const userCreated = await this.userRepository.save(newUser);

    if (userCreated) {
      delete userCreated.password;
      return userCreated;
    }
  }

  async login(user: LoginUserDto) {
    const userValidate = await this.validateUser(user.email, user.password);

    if (userValidate) {
      return this.authJwtService.generateJWT(userValidate);
    } else {
      return 'wrong credentials';
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    const comparePasswords = await this.authJwtService.comparePasswords(
      password,
      user.password,
    );

    if (comparePasswords) {
      return user;
    } else {
      throw new UnauthorizedException(`wrong credentials my friend!`);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    } else {
      throw new NotFoundException(
        `Could not find user =( with email: ${email}`,
      );
    }
  }
}
