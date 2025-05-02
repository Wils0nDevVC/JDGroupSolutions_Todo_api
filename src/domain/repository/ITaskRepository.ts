import { TaskEntity } from './../entities/task.entity';

export interface ITaskRepository {
  create(traslado: TaskEntity): Promise<TaskEntity>;
  findAll(userId:string): Promise<TaskEntity[]>;
  findById(id: string): Promise<TaskEntity | null>;
  update(id: string, traslado: Partial<TaskEntity>): Promise<TaskEntity | null>;
  delete(id: string): Promise<boolean>;
}


