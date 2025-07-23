import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
 /**
  * daftarin routenya disini dari src/route
  */
export default fp(async (_fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    // await fastify.register(fastifyWhitelabelRoutePlugin, options);
});
