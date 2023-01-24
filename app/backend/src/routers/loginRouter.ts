import { Router } from 'express';
import userController from '../database/controllers/userController';

const loginRouter = Router();

loginRouter.post('/', userController.login);

export default loginRouter;
