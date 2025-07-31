import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser } from '@application/services/User/UserService';
import { loginSchema } from '@utils/password/password';

export const loginHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return reply.status(400).send({ message: error.message });
  }

  try {
    const result = await loginUser(value.username, value.password);
    return reply.send(result);
  } catch (err: any) {
    return reply.status(401).send({ message: err.message });
  }
};
