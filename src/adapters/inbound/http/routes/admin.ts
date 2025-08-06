import {
    FastifyInstance,
    FastifyPluginOptions,
    RouteOptions,
    // FastifyRequest,
} from "fastify";
/**
 * perlu panggul controller authController atau sesuai yang ingin di butuhkan
 *  ex: import { AdminLogControllers, AdminTransactionControllers, AdminUserControllers, AdminMailControllers } from "../controller/admin-whitelabels";
 */



 /**
  * Route
  * ex:
  *
  *  {
  method: ["GET"],
  url: "/api/v1/admin/test",
  preHandler: CheckRules({ rules: Rules.MMB_CAN_VIEW_MENU }) -> untuk handle biasanya cuma cek apakah admin bukan dan sesui role kaga,
  handler: async () => {
      return "Hello world";
  },
  */

const routes:RouteOptions[]=[
]

export default async function FastifyAdminRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {

  for (const route of routes) {
      fastify.route({ ...route, config: options });
  }
}
