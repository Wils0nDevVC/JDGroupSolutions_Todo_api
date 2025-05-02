import { CreateTaskDto } from './../dto/task/CreateTaskDto ';
import { EstadoTask } from './../../domain/enum/estado_task.enum';
import { TaskEntity } from './../../domain/entities/task.entity';
import { ITaskRepository } from "../../domain/repository/ITaskRepository";

export class TaskService {
  constructor(
    private readonly TaskRepository: ITaskRepository,
  ) {}

  async createTask(taskData: CreateTaskDto): Promise<TaskEntity> {

    const task = new TaskEntity(
      "",
      taskData.titulo,
      taskData.descripcion,
      taskData.estado ?? EstadoTask.POR_HACER,  
      taskData.userId,
      new Date(),  
      new Date()   
    );

    return await this.TaskRepository.create(task);  // Cambio Task a task
  }

  // Obtener todos los Tasks
  async getAllTasks(userId: string): Promise<TaskEntity[]> {
    return await this.TaskRepository.findAll(userId);
  }

  // Obtener un Task por ID
  async getTaskById(id: string): Promise<TaskEntity | null> {
    return await this.TaskRepository.findById(id);  // Cambié el tipo 'number' por 'string' si usas mongoose
  }

  // Actualizar un Task
  async updateTask(id: string, taskData: Partial<TaskEntity>): Promise<TaskEntity | null> {
    return await this.TaskRepository.update(id, taskData);  // Cambié el tipo 'number' por 'string'
  }

  // Eliminar un Task
  async deleteTask(id: string): Promise<boolean> {
    return await this.TaskRepository.delete(id);  // Cambié el tipo 'number' por 'string'
  }
}
