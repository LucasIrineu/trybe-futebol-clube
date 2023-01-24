import * as jwt from 'jsonwebtoken';
import TUser from '../types/userType';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (userWithoutPassword: TUser) => {
  const token = jwt.sign(userWithoutPassword, secret, {
    algorithm: 'HS256',
    expiresIn: '45min',
  });

  return token;
};

export default { createToken };
