import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'User name' })
  name: string;

  @ApiProperty({ type: String, description: 'User lastname' })
  lastname: string;

  @ApiProperty({ type: String, description: 'User Email' })
  email: string;

  @ApiProperty({ type: String, description: 'User password' })
  password: string;
}
