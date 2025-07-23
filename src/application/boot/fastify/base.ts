import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifyFormBody from "@fastify/formbody";
import fastifyMulter from "fastify-multer";
import { FilesObject } from "fastify-multer/lib/interfaces";



export default fp(async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    await fastify.register(fastifyHelmet, {contentSecurityPolicy: {directives: {  imgSrc: ["'self'", "data:", "blob:"]}}})
            .register(fastifyFormBody)
            .register(fastifyMulter.contentParser);
});

declare module 'fastify' {
    interface FastifyRequest {
      files : FilesObject;
    }
}