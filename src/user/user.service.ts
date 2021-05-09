import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthJwtService } from 'src/auth-jwt/services/auth-jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserCreatedDto } from './dto/user-created-dto';
import { UserInterface } from './interfaces/UserInterface';
import { User } from './model/User';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface>,
    private authJwtService: AuthJwtService,
  ) {}

  async getUsers(): Promise<UserInterface[]> {
    const usersList = await this.userModel.find();

    usersList.forEach((user) => {
      delete user.password;
    });
    return usersList;
  }

  async getUser(id: string): Promise<UserInterface> {
    let user;

    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find user =( with id: ${id}`);
    }
    if (!user) {
      throw new NotFoundException(`Could not find user =( with id: ${id}`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserCreatedDto> {
    await this.ValidateEmailInUse(user.email);

    const passHashed = await this.authJwtService.hashPassword(user.password);

    const newUser = new User();
    newUser.name = user.name;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.password = passHashed;

    const newUserToCreate = new this.userModel(newUser);

    const userCreated = await newUserToCreate.save();

    if (userCreated) {
      const userDto = new UserCreatedDto();
      userDto.id = userCreated._id;

      return userDto;
    } else {
      throw new PreconditionFailedException(`user not created`);
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
  ): Promise<UserInterface> {
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

  private async findByEmail(email: string): Promise<UserInterface> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    } else {
      throw new NotFoundException(
        `Could not find user =( with email: ${email}`,
      );
    }
  }

  private async ValidateEmailInUse(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new PreconditionFailedException(`Email already in use: ${email}`);
    }
  }
}
