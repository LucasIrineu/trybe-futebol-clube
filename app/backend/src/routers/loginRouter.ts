import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import userController from '../database/controllers/userController';

const loginRouter = Router();

loginRouter.post('/', userController.login);
loginRouter.get('/validate', validateToken, userController.validateUser);

export default loginRouter;
