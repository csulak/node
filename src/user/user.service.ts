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
import { UserCreatedDto } from './dto/user-created-dto';
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

  async createUser(user: CreateUserDto): Promise<UserCreatedDto> {
    const passHashed = await this.authJwtService.hashPassword(user.password);

    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.password = passHashed;

    const userCreated = await this.userRepository.save(newUser);

    if (userCreated) {
      const userDto = new UserCreatedDto();
      userDto.id = userCreated.id;

      return userDto;
    }
  }

  async login(user: LoginUserDto): Promise<string> {
    const userValidate = await this.validateUser(user.email, user.password);

    if (userValidate) {
      delete userValidate.password;
      return this.authJwtService.generateJWT(userValidate);
    } else {
      return 'wrong credentials';
    }
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
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

  private async findByEmail(email: string): Promise<UserEntity> {
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
