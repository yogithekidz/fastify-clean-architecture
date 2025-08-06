import { GetMySQLDataSource } from '@infrastructure/mysql/connection';
import { UserEntity } from '@adapters/outbound/entities/UserEntity';

export async function getUserByUsernameRepo (username: string) {
  const dataSources = GetMySQLDataSource().getAll();
  const repo = dataSources[0].getRepository(UserEntity);
  /**
   * pakai entity sebenarnya sudah benar tapi kebanyakan developer disini menggunakan query
   * ex: SELECT * FROM user WHERE bla blaa lbaa....
   */
  return repo.findOneBy({ username });
};

export async function createUserRepo (user: { username: string; password: string }){
  const dataSources = GetMySQLDataSource().getAll();
  const repo = dataSources[0].getRepository(UserEntity);
  const newUser = repo.create({ ...user, is_active: true });
  return await repo.save(newUser);
};
export async function updateUserPassword(username: string, newPassword: string) {
  const dataSources = GetMySQLDataSource().getAll();
  const repo = dataSources[0].getRepository(UserEntity);

  // Pastikan user ada
  const user = await repo.query(
    'SELECT id FROM users WHERE username = ? LIMIT 1',
    [username]
  );
  if (!user) return null;

  const userId = user[0].id;

  // Update password via query
  await repo.query(
    'UPDATE users SET password = ? WHERE id = ?',
    [newPassword, userId]
  );

  return { success: true };
}