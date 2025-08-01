import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "@fastify/swagger";
import swaggerUi, { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import * as AppConfig from "@application/config/app.config";
export default fp(async (
  fastify: FastifyInstance,
) => {

  const isProd: boolean = AppConfig.GetConfig("production") || false;
  if (isProd) {
    return;
  }
  // const prefix: string = AppConfig.GetConfig("httpPrefix") || "";
  const options = {
    exposeRoute: true,
    swagger: {
      info: {
        title: "MMB-Backend",
        version: "1.0.0",
        description: "API Doc MMB",
      },
      // basePath: prefix,
      schemes: ['http'],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        ApiToken: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Authorization header token, sample: 'Bearer #TOKEN#'",
        },
        Secret: {
          type: "apiKey",
          name: "mmbsecret",
          in: "header",
          description: "Secret from Whitelabel manager"
        },
      },
      security: [
        {
          ApiToken: []
        },
        {
          Secret: []
        }
      ],
      tags: [
        { name: "Client Whitelabel" },
        { name: "Admin Whitelabel" }
      ],
    },

    hiddenTag: "Hidden",
    hideUntagged: false,


    // customCss:
    //   ".swagger-ui .topbar { display: none } .swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus { outline: none }",
  } as SwaggerOptions;

  const optionUi = {
    staticCSP: false,
    exposeRoute: true,
    // transformSpecificationClone: true,
    routePrefix: `/documentation`,
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
      persistAuthorization: true
    },
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any) => swaggerObject,
  } as FastifySwaggerUiOptions;

  fastify.register(swagger, options);
  fastify.register(swaggerUi, optionUi);
});
