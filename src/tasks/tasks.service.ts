import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task } from './interfaces/Task';
import { DeleteResult, getRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task } from './entity/task';

@Injectable()
export class TasksService {
  async getTasks() {
    return await getRepository(Task).find();
  }

  async getTask(id: string) {
    const task = await getRepository(Task).findOne(id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Could not find task =( with id: ${id}`);
    }
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = getRepository(Task).create(task);
    return await getRepository(Task).save(newTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const user = await getRepository(Task).delete(id);

    return user;
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

    return await getRepository(Task).save(updatedTask);
  }
}
