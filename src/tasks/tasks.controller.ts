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
import { DeleteResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
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
  getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.deleteTask(id);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    return this.taskService.updateTask(task);
  }
}
