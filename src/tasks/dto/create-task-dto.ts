import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ type: String, description: 'titulo de la tarea' })
  title: string;

  @ApiProperty({ type: String, description: 'descripcion de la tarea' })
  description: string;

  @ApiProperty({ type: Boolean, description: 'is done or not' })
  done: boolean;
}
