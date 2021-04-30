import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ type: String, description: 'User Email' })
  email: string;

  @ApiProperty({ type: String, description: 'user Password' })
  password: string;
}
