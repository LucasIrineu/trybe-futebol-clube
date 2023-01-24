import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const user = jwt.verify(authorization as string, process.env.JWT_SECRET as string);

  req.body.userInfo = user;
  next();
};

export default validateToken;
