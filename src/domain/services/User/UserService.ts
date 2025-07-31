import { getUserByUsernameRepo } from '@adapters/outbound/repositories/UserRepository';

export const getUserByUsername = async (username: string) => {
  const user = await getUserByUsernameRepo(username);
  if (!user || !user.is_active) return null;
  return user;
};