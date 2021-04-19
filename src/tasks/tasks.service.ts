import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/Task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getTasks() {
    return await this.taskModel.find();
  }

  async getTask(id: string) {
    let task;

    try {
      task = await this.taskModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find product =( with id: ${id}`);
    }
    if (!task) {
      throw new NotFoundException(`Could not find product =( with id: ${id}`);
    }
    return task;
  }

  async createTask(task: CreateTaskDto) {
    const newTask = new this.taskModel(task);
    return await newTask.save();
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

    return await updatedTask.save();
  }

  async deleteTask(id: string) {
    return await this.taskModel.deleteOne({ _id: id });
  }
}
