// import { AuthRequest } from './../middlewares/auth.middleware';
import mongoose from 'mongoose';
import { CustomError } from './../../domain/errors/custom.error';
import { UpdateTaskDto } from './../../application/dto/task/UpdateTaskDto ';
import { CreateTaskDto } from './../../application/dto/task/CreateTaskDto ';
import { TaskService } from './../../application/services/task.service';
import { Request, Response } from 'express';
import { handlerError } from '../shared';

export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  // Crear un nuevo Task
  createTask = async (req: Request, res: Response) => {
   
    try {
      const { titulo, descripcion, estado } = req.body;
      if (!req.body.userId) throw new Error("User ID missing");

      const dto: CreateTaskDto = {
        titulo,
        descripcion,
        estado,
        userId: req.body.userId,
      };

      const newTask = await this.TaskService.createTask(dto);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error al crear el Task:', error);
      handlerError(error, res, req);
    }
  }

  // Obtener todos los Tasks
  getAllTasks = async (req: Request, res: Response) => {
    try {
      if (!req.body.userId) throw new Error("User ID missing");
      const tasks = await this.TaskService.getAllTasks(req.body.userId);
      res.json(tasks);
    } catch (error) {
      console.error('Error al obtener los Tasks:', error);
      handlerError(error, res, req);
    }

   
  }

  // Obtener un Task por ID
  getTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'ID de Task inválido');
      }
  
      const task = await this.TaskService.getTaskById(id);
  
      if (!task) {
        throw new CustomError(404, 'Task no encontrado');
      }
  
      res.json(task);
  
    } catch (error) {
      if (error instanceof CustomError) {
        handlerError(error, res, req); 
      } else {
        const unknownError = new CustomError(500, 'Error interno del servidor');
        handlerError(unknownError, res, req); 
      }
    }
  };
  
  // Actualizar un Task
  updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'ID de Task inválido');
      }
      const TaskData: UpdateTaskDto = req.body; // Aquí aplicas el DTO
      const updatedTask = await this.TaskService.updateTask(id, TaskData);
      
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task no encontrado.' });
      }
      
      res.json(updatedTask);
    } catch (error) {
      console.error('Error al actualizar el Task:', error);
      handlerError(error, res, req);
    }
  }

  // Eliminar un Task
  deleteTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.TaskService.deleteTask(id);
      if (!result) {
        return res.status(404).json({ message: 'Task no encontrado.' });
      }
      res.json({ message: 'Task eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar el Task:', error);
      handlerError(error, res, req);
    }
  }


}
