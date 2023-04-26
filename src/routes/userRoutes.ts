import express from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  loginController,
  addBookmarkController,
  removeBookmarkController,
} from "../controllers/users.controller.js";
import { checkValidation } from "../middleware/validation/checkValidation.js";
import { validateIdParam } from "../middleware/validation/validateParams.js";
import { authenticateUser } from "../middleware/authenticate.js";
import {
  validateLoginEmail,
  validateLoginPassword,
  validateRegisterEmail,
  validateRegisterPassword,
} from "../middleware/validation/validateBody.js";
import {
  validateBelongsToUser,
  validateBookmarkIdQuery,
  validateUserIdQuery,
} from "../middleware/validation/validateQuery.js";

export const userRouter = express.Router();

userRouter.get("/users", getUsersController);

userRouter.get(
  "/users/:id",
  validateIdParam,
  checkValidation,
  getUserByIdController
);

userRouter.post(
  "/users",
  validateRegisterEmail,
  validateRegisterPassword,
  checkValidation,
  createUserController
);

userRouter.patch(
  "/users/add-bookmark",
  validateUserIdQuery,
  validateBookmarkIdQuery,
  validateBelongsToUser,
  checkValidation,
  addBookmarkController
);

userRouter.patch(
  "/users/remove-bookmark",
  validateUserIdQuery,
  validateBookmarkIdQuery,
  checkValidation,
  removeBookmarkController
);

userRouter.post(
  "/login",
  validateLoginEmail,
  validateLoginPassword,
  checkValidation,
  authenticateUser,
  loginController
);
