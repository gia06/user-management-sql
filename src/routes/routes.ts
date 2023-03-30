import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import {
  createUserController,
  getUsersController,
} from "../controllers/users.controller.js";

export const router = express.Router();

const swaggerJsDoc = YAML.load("src/swagger/swagger.yaml");

router.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

router.get("/users", getUsersController);

// router.get("user/:id")

router.post("/user", createUserController);

router.post("/", (req: Request, res: Response): void => {
  console.log(req.body);
  res.send("hi");
});
