import { compare } from 'bcrypt';
import { getUserByUsername } from '@domain/services/User/UserService';

export const loginUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error('Invalid credentials or inactive account');

  const isValid = await compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  return { message: 'Login success', userId: user.id };
};

