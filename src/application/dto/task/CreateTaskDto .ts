import { EstadoTask } from './../../../domain/enum/estado_task.enum';

export interface CreateTaskDto {
    titulo: string;
    descripcion: string;
    estado?: EstadoTask; 
    userId: string;
  }
  