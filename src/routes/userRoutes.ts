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
  validateEmail,
  validatePassword,
} from "../validation/validateRegisterBody.js";
import { checkValidation } from "../validation/checkValidation.js";
import { validateId } from "../validation/validateId.js";
import {
  validateUserId,
  validateBookmarkId,
} from "../validation/validateQuery.js";

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
  validateEmail,
  validatePassword,
  checkValidation,
  createUserController
);

//TODO : need updating after login route
userRouter.patch(
  "/users/add-bookmark",
  validateUserId,
  validateBookmarkId,
  checkValidation,
  addBookmarkController
);

userRouter.patch(
  "/users/remove-bookmark",
  validateUserId,
  validateBookmarkId,
  checkValidation,
  removeBookmarkController
);

userRouter.post("/login", loginController);
