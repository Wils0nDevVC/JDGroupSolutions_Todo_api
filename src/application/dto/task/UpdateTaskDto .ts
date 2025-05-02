import { EstadoTask } from './../../../domain/enum/estado_task.enum';

export interface UpdateTaskDto {
  titulo?: string;
  descripcion?: string;
  estado?: EstadoTask;
}
