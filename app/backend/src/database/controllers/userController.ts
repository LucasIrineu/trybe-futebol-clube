import { Request, Response } from 'express';
import userService from '../../services/userService';

const login = async (req: Request, res: Response) => {
  console.log('status:  payload: ');
  console.log('email: ', req.body.email, 'password: ', req.body.password);
  const { email, password } = req.body;
  const { status, payload } = await userService.validateUser(email, password);

  if (status === 401 || !email || !password) return res.status(status).json({ message: payload });
  if (status === 200) return res.status(status).json({ token: payload });
};

export default {
  login,
};
