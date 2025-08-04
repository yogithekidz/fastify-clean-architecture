import { FastifyInstance, FastifyPluginOptions, RouteOptions } from 'fastify';
// import { loginHandler } from '@adapters/inbound/http/controller/auth/AuthController';
import { AuthController } from "../controller/auth";
import { Type } from '@sinclair/typebox';
// const authRoutes: FastifyPluginAsync = async (fastify) => {
//   fastify.post('/login', loginHandler);
// };

// export default authRoutes;

const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/api/v1/admin/test",
    // preHandler: CheckRules({ rules: Rules.MMB_CAN_VIEW_MENU }),
    handler: async () => {
      return "Hello world";
    },
  },
  {
    method: ["POST"],
    url: "/api/v1/login",
    // preHandler: CheckRules({ rules: Rules.MMB_CAN_VIEW_MENU }), -> biasanya di gunakan untuk cke role
    handler: AuthController.loginHandler
    /**
     * untuk schema di sesuaikan saja bisa  sesuai kebutuhan
     */
  //   schema: {
  //     tags: ["Admin Whitelabel"],
  //     description: "Restore Trashed User",
  //     summary: "Restore Trashed User",
  //     body: Schema.BaseRequestSchema("Rakha", { user_id: { type: "integer" } }),
  //     response: Schema.BaseResponse({
  //         type: "Boolean",
  //     })
  // },
  },
  {
    method: ["POST"],
    url: "/api/v1/register",
    handler: AuthController.registerHandler
  },
{
  method: ["DELETE"],
  url: "/api/v1/delete/users/:username",
  schema: {
    params: Type.Object({
      username: Type.String(),
    }),
  },
  handler: AuthController.deactivateUserHandler,
} as RouteOptions
];

export default async function FastifyAuthPluginRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // fastify.addHook("preValidation", MMBWhitelabelAuthValidate);
  for (const route of routes) {
      fastify.route({ ...route, config: options });
  }
}

