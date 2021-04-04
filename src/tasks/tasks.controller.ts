import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Request, response } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/Task';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }
  /**
  // asi es la forma de hacer un llamado con express, pero se recomienda usar nest, mas simple, mas rapido de codear y menos verboso 
  @Get()
  getTask(@Req() req, @Res() res) {
    return res.send('hello world');
  }
   */

  @Get(':id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.getTask(parseInt(id));
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): string {
    console.log({ task });
    return 'creando tarea';
  }

  @Put(':id')
  updateTask(@Body() task: CreateTaskDto, @Param('id') id): string {
    console.log({ task });
    console.log({ id });
    return 'actualizando una tarea';
  }

  @Delete(':id')
  deleteTask(@Param('id') id): string {
    return `eliminando una tarea numero: ${id}`;
  }
}
