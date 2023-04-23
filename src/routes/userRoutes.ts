import express from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  loginController,
  addBookmarkController,
  removeBookmarkController,
} from "../controllers/users.controller.js";
import {
  validateRegisterEmail,
  validateRegisterPassword,
} from "../middleware/validation/validateRegisterBody.js";
import { checkValidation } from "../middleware/validation/checkValidation.js";
import { validateId } from "../middleware/validation/validateId.js";
import {
  validateUserId,
  validateBookmarkId,
} from "../middleware/validation/validateQuery.js";
import {
  validateLoginEmail,
  validateLoginPassword,
} from "../middleware/validation/validateLoginBody.ts.js";
import { authenticateUser } from "../middleware/authenticate.js";

export const userRouter = express.Router();

userRouter.get("/users", getUsersController);

userRouter.get(
  "/users/:id",
  validateId,
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

//  TODO: should add validation if user already has bookmark
userRouter.patch(
  "/users/add-bookmark",
  validateUserId,
  validateBookmarkId,
  checkValidation,
  addBookmarkController
);

//  TODO: should add validation if user already has bookmark
userRouter.patch(
  "/users/remove-bookmark",
  validateUserId,
  validateBookmarkId,
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
