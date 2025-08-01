import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser } from '@application/services/User/UserService';
import { loginSchema } from '@utils/password/password';

export const loginHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply.status(400).send("GG");
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    // return reply.status(400).send({ message: error.message });
  }

  try {
    const result = await loginUser(value.username, value.password);
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
