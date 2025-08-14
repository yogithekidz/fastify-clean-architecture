import { RegisterInput } from '@application/services/Register/RegisterService';
import { hashPassword } from '@utils/password/password';
import { createUserRepo, getUserByUsernameRepo } from '@adapters/outbound/repositories/UserRepository';

export async function registerUser (input: RegisterInput) {
  const existingUser = await getUserByUsernameRepo(input.username)
  if (existingUser) {
    throw new Error("Username sudah terdaftar");
  }
  const hashed = await hashPassword(input.password);
  return await createUserRepo({ username: input.username, password: hashed });
};

