import { ImpTaskRepository } from './../../infraestructure/repository/ImpTaskRepository';
import { TaskService } from './../../application/services/task.service';
import { Router } from 'express';
import { TaskController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    // Instancia de dependencias
    const taskRepository = new ImpTaskRepository();
    const taskService = new TaskService(taskRepository);

    // Inyección de dependencias en el controlador
    const controller = new TaskController(taskService);

    router.post('/',[AuthMiddleware.validateJWT], controller.createTask);
    router.get('/',[AuthMiddleware.validateJWT], controller.getAllTasks);
    router.get('/:id',[AuthMiddleware.validateJWT], controller.getTaskById);
    router.put('/:id',[AuthMiddleware.validateJWT], controller.updateTask);
    router.delete('/:id',[AuthMiddleware.validateJWT], controller.deleteTask);

    return router;
  }
}
