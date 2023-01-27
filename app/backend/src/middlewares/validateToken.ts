import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    const userAuth = jwt.verify(authorization as string, process.env.JWT_SECRET as string);

    req.body.userInfo = userAuth;
    next();
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
