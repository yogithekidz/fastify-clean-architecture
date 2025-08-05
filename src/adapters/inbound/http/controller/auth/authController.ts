import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser, changePassword } from '@application/services/User/UserService';
import { registerUser } from '@domain/services/Register/RegisterService';
import { UserRequestLoginDto, UserRequestRegisterDto, UserRequestChangePasswordDto} from '@domain/model/request/UserRequestDto';

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
    const result = await changePassword(payload);
    return reply.code(200).send({ message: 'Password changed succesfully', data: result})
  } catch (err: any) {
    return reply.status(401).send({ message: err.message})
  }
}