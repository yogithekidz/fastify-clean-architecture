// import  bcrypt from 'bcrypt';

// export function acak(strPass?: string): string {
// }

// export async function checkPassword(password: string, hashedPassword?: string):Promise<boolean>{
// }

// export async function hashPassword(password: string): Promise<string> {
//   }

import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}