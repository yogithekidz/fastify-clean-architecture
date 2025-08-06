import { RegisterInput } from '@application/services/Register/RegisterService';
import { hashPassword } from '@utils/password/password';
import { createUserRepo } from '@adapters/outbound/repositories/UserRepository';

export async function registerUser (input: RegisterInput) {
  const hashed = await hashPassword(input.password);
  return await createUserRepo({ username: input.username, password: hashed });
};

