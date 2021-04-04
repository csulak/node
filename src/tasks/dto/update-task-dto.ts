import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ type: String, description: 'id de la tarea a actualizar' })
  id: string;

  @ApiProperty({ type: String, description: 'titulo de la tarea' })
  title: string;

  @ApiProperty({ type: String, description: 'descripcion de la tarea' })
  description: string;

  @ApiProperty({ type: Boolean, description: 'is done or not' })
  done: boolean;
}
