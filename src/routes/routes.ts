import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

export const router = express.Router();

const swaggerJsDoc = YAML.load("src/swagger/swagger.yaml");

router.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

router.get("/", (req: Request, res: Response): void => {
  res.send("hi");
});

// router.get("/", (req: Request, res: Response) => {});

// export default router;
