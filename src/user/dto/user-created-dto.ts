import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedDto {
  @ApiProperty({ type: String, description: 'User id' })
  id: string;
}
