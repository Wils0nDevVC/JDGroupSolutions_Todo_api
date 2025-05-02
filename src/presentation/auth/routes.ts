import { loginLimiter } from './../middlewares/login-limiter.middleware';
import { ImpUserRepository } from './../../infraestructure/repository/ImpUserRepository';
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../application/services/auth.service';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const userRepository = new ImpUserRepository();

    const authService = new AuthService(userRepository)
    const controller = new AuthController(authService);
    
    router.post('/login', loginLimiter,controller.loginUser );
    router.post('/register', controller.registerUser );




    return router;
  }


}

