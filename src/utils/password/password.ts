// import  bcrypt from 'bcrypt';

// export function acak(strPass?: string): string {
// }

// export async function checkPassword(password: string, hashedPassword?: string):Promise<boolean>{
// }

// export async function hashPassword(password: string): Promise<string> {
//   }

import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(4).max(8).required(),
});