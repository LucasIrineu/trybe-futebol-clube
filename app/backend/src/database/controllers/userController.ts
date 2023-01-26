import { Request, Response } from 'express';
import userService from '../../services/userService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const { status, payload } = await userService.validateUser(email, password);

  if (status === 401) return res.status(status).json({ message: payload });
  if (status === 200) return res.status(status).json({ token: payload });
};

const validateUser = async (req: Request, res: Response) => {
  const { role } = req.body.userInfo;

  return res.status(200).json({ role });
};

export default {
  login,
  validateUser,
};
