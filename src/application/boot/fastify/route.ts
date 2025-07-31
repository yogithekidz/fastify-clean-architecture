// import fp from "fastify-plugin";
// import { FastifyInstance, FastifyPluginOptions } from "fastify";
//  /**
//   * daftarin routenya disini dari src/route
//   */
// export default fp(async (_fastify: FastifyInstance, _options: FastifyPluginOptions) => {
//     // await fastify.register(fastifyWhitelabelRoutePlugin, options);
// });

import { FastifyPluginAsync } from "fastify";
import authRoutes from "@adapters/inbound/http/routes/auth";

const FastifyRouteAddon: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
};

export default FastifyRouteAddon;