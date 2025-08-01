import { GetMySQLDataSource } from '@infrastructure/mysql/connection';
import { UserEntity } from '@adapters/outbound/entities/UserEntity';

export const getUserByUsernameRepo = async (username: string) => {
  const dataSources = GetMySQLDataSource().getAll();

  if (dataSources.length === 0) {
    throw new Error('No MySQL data source initialized'); // ini harusnya kaga perlu karena sudah di handle di entry/main
  }

  const repo = dataSources[0].getRepository(UserEntity);
  /**
   * pakai entity sebenarnya sudah benar tapi kebanyakan developer disini menggunakan query
   * ex: SELECT * FROM user WHERE bla blaa lbaa....
   */
  return repo.findOneBy({ username });
};
