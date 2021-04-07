import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task } from './interfaces/Task';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task } from './entity/task';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getTasks() {
    return this.tasksRepository.find();
  }

  async getTask(id: string) {
    const task = await this.tasksRepository.findOne(id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Could not find task =( with id: ${id}`);
    }
  }

  createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  deleteTask(id: string): Promise<DeleteResult> {
    const task = this.tasksRepository.delete(id);

    return task;
  }

  async updateTask(taskToUpdate: UpdateTaskDto) {
    const updatedTask = await this.getTask(taskToUpdate.id);

    if (taskToUpdate.title) {
      updatedTask.title = taskToUpdate.title;
    }
    if (taskToUpdate.description) {
      updatedTask.description = taskToUpdate.description;
    }
    if (taskToUpdate.done !== null) {
      updatedTask.done = taskToUpdate.done;
    }

    return this.tasksRepository.save(updatedTask);
  }
}
