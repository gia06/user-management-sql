import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerJsDoc = YAML.load("src/swagger/swagger.yaml");

export const swaggerRouter = express.Router();

swaggerRouter.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));
