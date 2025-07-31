import { GetMySQLDataSource } from '@infrastructure/mysql/connection';
import { UserEntity } from '@adapters/outbound/entities/UserEntity';

export const getUserByUsernameRepo = async (username: string) => {
  const dataSources = GetMySQLDataSource().getAll();

  if (dataSources.length === 0) {
    throw new Error('No MySQL data source initialized');
  }

  const repo = dataSources[0].getRepository(UserEntity);
  return repo.findOneBy({ username });
};
