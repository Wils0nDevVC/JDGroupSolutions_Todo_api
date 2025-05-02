import { EstadoTask } from './../../domain/enum/estado_task.enum';
import { TaskModel } from './../../data/mongo/models/task.model';
import { TaskEntity } from './../../domain/entities/task.entity';
import { ITaskRepository } from './../../domain/repository/ITaskRepository';
import { Types } from 'mongoose';

export class ImpTaskRepository implements ITaskRepository {
  async findAll(userId: string): Promise<TaskEntity[]> {
    const tasks = await TaskModel.find({ user: new Types.ObjectId(userId) }).exec();
    return tasks.map((task : any  )=> new TaskEntity(
      task._id.toString(),
      task.titulo,
      task.descripcion,
      task.estado,
      task.user.toString(),
      task.createdAt,
      task.updatedAt
    ));
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await TaskModel.findById(id).exec();
    return task ? new TaskEntity(
      task._id.toString(),
      task.titulo,
      task.descripcion,
      task.estado,
      task.user.toString(),
      task.createdAt,
      task.updatedAt
    ) : null;
  }

  async create(task: TaskEntity): Promise<TaskEntity> {
    const created = await TaskModel.create({
      titulo: task.titulo,
      descripcion: task.descripcion,
      estado: task.estado,
      user: new Types.ObjectId(task.userId),
    });
    return new TaskEntity(
      created._id.toString(),
      created.titulo,
      created.descripcion,
      created.estado,
      created.user.toString(),
      created.createdAt,
      created.updatedAt
    );
  }

  async update(id: string, task: Partial<TaskEntity>): Promise<TaskEntity | null> {
    const updated = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: {
          titulo: task.titulo,
          descripcion: task.descripcion,
          estado: task.estado,
          user: task.userId ? new Types.ObjectId(task.userId) : undefined,
        },
      },
      { new: true }
    ).exec();

    return updated ? new TaskEntity(
      updated._id.toString(),
      updated.titulo,
      updated.descripcion,
      updated.estado,
      updated.user.toString(),
      updated.createdAt,
      updated.updatedAt
    ) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
