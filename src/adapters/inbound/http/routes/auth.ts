import { FastifyPluginAsync } from 'fastify';
import { loginHandler } from '@adapters/inbound/http/controller/auth/AuthController';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/login', loginHandler);
};

export default authRoutes;