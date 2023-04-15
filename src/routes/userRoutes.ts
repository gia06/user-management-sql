import express from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  loginController,
  partialUpdateController,
} from "../controllers/users.controller.js";
import { validateRegisterBody } from "../validation/validateRegisterBody.js";
import { checkValidation } from "../validation/checkValidation.js";
import { validateId } from "../validation/validateId.js";

export const userRouter = express.Router();

userRouter.get("/users", getUsersController);

userRouter.get(
  "/users/:id",
  validateId,
  checkValidation,
  getUserByIdController
);

userRouter.post(
  "/user",
  validateRegisterBody().validateEmail,
  validateRegisterBody().validatePassword,
  checkValidation,
  createUserController
);

//TODO : need updating after login route
userRouter.put("/users/:id", partialUpdateController);

userRouter.post("/login", loginController);
