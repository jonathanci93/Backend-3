import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.1",
        info: { title: "Backend 3 - API", version: "1.0.0" }
    },
    apis: ["./src/docs/*.yaml"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
