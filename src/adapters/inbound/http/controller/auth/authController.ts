import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser, changePassword, handleRefreshToken } from '@application/services/User/UserService';
import { registerUser } from '@domain/services/Register/RegisterService';
import { UserRequestLoginDto, UserRequestRegisterDto, UserRequestChangePasswordDto} from '@domain/model/request/UserRequestDto';
// import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '@application/services/Token/TokenService';
// import { getUserByUsernameRepo, updateUserRefreshToken } from '@adapters/outbound/repositories/UserRepository';
// import { RefreshTokenPayload } from '@domain/model/request/tokenRequestDto';
// import { RefreshTokenRoute } from '@adapters/inbound/http/routes/refreshTokenRoute';

 /**
  * penulisan functionya bisa langgsung aja
  *  export async loginHandler() {}
  *
  * untuk request.body jangan langsung di validasi cuma di berikan typenya saja
  * ex:
  * const userLogin = req.body as UserRequestLoginDto
  * as disini untuk memberi tahu bahwa userLogin itu punya type yang sudah di tentukan semacam type casting namanya
  * style yang elu bikin engga salah juga cuma disini code stylenya seperti yang di consothkan jadi mohon di ganti
  */

export async function loginHandler (req: FastifyRequest, reply: FastifyReply) {
  const userLogin = req.body as UserRequestLoginDto;

  try {
    const result = await loginUser(userLogin.username, userLogin.password);
    return reply.send(result);
  } catch (err: any) {
    return reply.status(401).send({ message: err.message });
  }
};

export async function registerHandler (req: FastifyRequest, reply: FastifyReply) {
  const userRegister = req.body as UserRequestRegisterDto;
  try {
    const result = await registerUser(userRegister);
    return reply.send({
      message:'Register Succes', 
      data: result});
  } catch (err: any) {
    return reply.status(401).send({ message: err.message});
  }
}

export async function changePasswordHandler (req: FastifyRequest, reply: FastifyReply){
  const payload = req.body as UserRequestChangePasswordDto;
  try {
    await changePassword(payload);
    return reply.code(200).send({ message: 'Password changed succesfully'})
  } catch (err: any) {
    return reply.status(401).send({ message: err.message})
  }
}

export async function refreshTokenHandler(req: FastifyRequest, reply: FastifyReply){
  const authHeader = req.headers.authorization;
  const refreshToken = authHeader?.split(' ')[1];
  
  const { username, password } = req.body as { username: string; password: string };
  if (!refreshToken) return reply.status(401).send({ message: 'Token missing' });

  try {
    const tokens = await handleRefreshToken({ username, password, refreshToken });
    return reply.send(tokens);
  } catch (err: any) {
    return reply.status(403).send( {message: err.message});
  }
}