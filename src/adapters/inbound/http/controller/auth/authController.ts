import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser } from '@application/services/User/UserService';
import { registerUser } from '@domain/services/Register/RegisterService';
import { deactiveUserByUsername } from '@application/services/User/UserService';
import { UserRequestLoginDto, UserRequestRegisterDto, UserRequestDeactivateDto} from '@domain/model/request/UserRequestDto';

export async function loginHandler (req: FastifyRequest, reply: FastifyReply) {
  const userLogin = req.body as UserRequestLoginDto;

  try {
    const result = await loginUser(userLogin.username, userLogin.password);
    return reply.send(result);
  } catch (err: any) {
    return reply.status(401).send({ message: err.message });
  }
};

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

// export async function deactivateUserHandler (req: FastifyRequest, reply: FastifyReply) {
//   const deactivateRequest = req.params as UserRequestDeactivateDto;
//   if (!deactivateRequest?.username) {
//     return reply.status(404).send({ message: 'Username is required' });
//   }
//   console.log('Deactivate Request: ', deactivateRequest);
//   try {
//     const result = await deactiveUserByUsername(deactivateRequest.username);
//     return reply.send(result);
//   } catch (err: any) {
//     return reply.status(400).send({ message: err.message });
//   }
// }

export async function deactivateUserHandler(req: FastifyRequest <{ Params : UserRequestDeactivateDto }>, reply: FastifyReply) {
  console.log('req.params:', req.params);
  const { username } = req.params;

  if (!username) {
    return reply.status(400).send({ message: 'Username is required' });
  }

  try {
    await deactiveUserByUsername(username);
    return reply.send({ message: `User ${username} deactivated successfully.` });
  } catch (err: any) {
    return reply.status(500).send({ message: err.message });
  }
}
