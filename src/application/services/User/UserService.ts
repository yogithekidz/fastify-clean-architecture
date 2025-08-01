import { compare } from 'bcrypt';
import { getUserByUsername } from '@domain/services/User/UserService';

export const loginUser = async (username: string, password: string) => {
  /**
   * Disini baru pakai joi untuk validasi
   * ex:
      *   const schema = Joi.object({
          limit: Joi.number().min(1),
          lastId: Joi.number(),
          user_id: Joi.number().required(),
          search: Joi.string().allow(""),
          referrer_id: Joi.number().required(),
          sort: Joi.string().valid("ASC", 'DESC')
      });
    await schema.validateAsync({ user_id, referrer_id, search, limit, lastId, sort })
    * Compare password buatkan di utils jagann langsung di terapkan di sini
    *
   */
  const user = await getUserByUsername(username);
  if (!user) throw new Error('Invalid credentials or inactive account');

  const isValid = await compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  return { message: 'Login success', userId: user.id };
};
