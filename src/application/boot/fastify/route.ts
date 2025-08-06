import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import FastifyAuthPluginRoute from "@adapters/inbound/http/routes/auth";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    await fastify.register(FastifyAuthPluginRoute, options);
});
// import { FastifyPluginAsync } from "fastify";
// import authRoutes from "@adapters/inbound/http/routes/auth";

// const FastifyRouteAddon: FastifyPluginAsync = async (fastify) => {
//   fastify.register(authRoutes, {
//     prefix: "/auth",
//   });
// };

// export default FastifyRouteAddon;
