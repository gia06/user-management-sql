import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
} from "../controllers/users.controller.js";
import {
  checkExistenceByEmail,
  checkExistenceByID,
} from "../middleware/checkExistence.js";

export const router = express.Router();

const swaggerJsDoc = YAML.load("src/swagger/swagger.yaml");

router.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

router.get("/users", getUsersController);

router.get("/users/:id", checkExistenceByID, getUserByIdController);

router.post("/user", checkExistenceByEmail, createUserController);
