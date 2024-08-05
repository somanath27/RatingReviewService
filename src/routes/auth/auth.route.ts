import { Router } from 'express';
import { AuthController } from '@controllers/index';
import { Routes } from '@interfaces/index';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/signup', this.authController.userRegister);

    this.router.post(this.path + '/login', this.authController.userLogin);
  }
}

export default AuthRoute;
