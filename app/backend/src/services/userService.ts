import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import jwtFunctions from '../auth/jwtFunctions';

const validateUser = async (emailInput: string, passwordInput: string) => {
  const user = await User.findOne({
    where: { email: emailInput },
  });

  console.log('user: ', user);

  if (!user) return { status: 401, payload: 'Incorrect email or password' };

  const passwordCheck = await bcrypt.compare(passwordInput, user.dataValues.password);

  if (passwordCheck === false) return { status: 401, payload: 'Incorrect email or password' };

  const { password: _, ...userWithoutPassword } = user.dataValues;

  console.log('userWithoutPassword: ', userWithoutPassword);
  const token = jwtFunctions.createToken(userWithoutPassword);

  return { status: 200, payload: token };
};

export default {
  validateUser,
};
