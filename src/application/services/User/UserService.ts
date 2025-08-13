import { comparePassword, hashPassword } from '@utils/password/password';
import { getUserByUsername } from '@domain/services/User/UserService';
import Joi from 'joi';
import { UserRequestChangePasswordDto } from '@domain/model/request/UserRequestDto';
import { updateUserPassword} from '@adapters/outbound/repositories/UserRepository';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../Token/TokenService';
import { RefreshTokenPayload, RefreshTokenRequestDto } from '@domain/model/request/tokenRequestDto';

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

export async function loginUser (username: string, password: string) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  await schema.validateAsync({ username, password });

  const user = await getUserByUsername(username);
  if (!user) throw new Error('Invalid credentials or inactive account');
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');
  const payload: RefreshTokenPayload = {
    id: user?.id, 
    username: user?.username,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  
  return { message: 'Login success', userId: user.id, accessToken, refreshToken };
};

export async function changePassword(payload: UserRequestChangePasswordDto) {
  const schema = Joi.object({
    username: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  });
  await schema.validateAsync(payload);

  const user = await getUserByUsername(payload.username);
  if(!user) throw new Error('User Not Found');

  const isMatch = await comparePassword(payload.oldPassword, user.password);
  if (!isMatch) throw new Error('Old password is incorrect');

  const hashedNewPassword = await hashPassword(payload.newPassword);
  await updateUserPassword(payload.username, hashedNewPassword)

  return { message: 'Password changed successfully' };  
}

export async function handleRefreshToken(input: RefreshTokenRequestDto) {
  const { username, password, refreshToken } = input;

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    refreshToken: Joi.string().required(),
  });

  await schema.validateAsync({ username, password, refreshToken });

  const user = await getUserByUsername(username);
  if (!user) throw new Error('Invalid credentials or inactive account');
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const decoded = verifyRefreshToken(refreshToken);
  if (decoded.username !== username) throw new Error('Token mismatch');

  const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
  const newRefreshToken = generateRefreshToken({ id: user.id, username: user.username });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

