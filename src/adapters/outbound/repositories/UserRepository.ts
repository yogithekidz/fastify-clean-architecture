import { GetMySQLDataSource, MysqlDataSource } from '@infrastructure/mysql/connection';
import { UserEntity } from '@adapters/outbound/entities/UserEntity';

export const getUserByUsernameRepo = async (username: string) => {
  const dataSources = GetMySQLDataSource().getAll();
  const repo = dataSources[0].getRepository(UserEntity);
  /**
   * pakai entity sebenarnya sudah benar tapi kebanyakan developer disini menggunakan query
   * ex: SELECT * FROM user WHERE bla blaa lbaa....
   */
  return repo.findOneBy({ username });
};

export const createUserRepo = async (user: { username: string; password: string }) => {
  const dataSources = GetMySQLDataSource().getAll();
  const repo = dataSources[0].getRepository(UserEntity);
  const newUser = repo.create({ ...user, is_active: true });
  return await repo.save(newUser);
};

export const deactivateUserRepo = async (username: string) => {
  const dataSource = await MysqlDataSource.prototype.GetDataSource();
  const repo = dataSource.getRepository(UserEntity);
  await repo.update({username}, { is_active: false });
};