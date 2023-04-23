import { Request, Response } from "express";
import {
  createUser,
  findUserById,
  getUsers,
  loginService,
  addBookmark,
  removeBookmark,
} from "../services/users.service.js";
import { signJwt } from "../utils/jwt.js";
import { logger } from "../logger/logger.js";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await findUserById(req.params.id);
  res.status(200).json(user);
};

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
};

export const addBookmarkController = async (req: Request, res: Response) => {
  const { userId, bookmarkId } = req.query;
  await addBookmark(userId.toString(), bookmarkId.toString());
  res.sendStatus;
};

export const removeBookmarkController = async (req: Request, res: Response) => {
  const { userId, bookmarkId } = req.query;
  try {
    await removeBookmark(userId.toString(), bookmarkId.toString());
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      error: {
        message: "Failed to update item in database.",
        details:
          "There was an error while attempting to store the item in the database. Please try again later.",
      },
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  console.log("controller", res.locals.user);
  const { user } = res.locals;
  const { id, isAdmin } = user;

  const token = await signJwt({ id, isAdmin });

  res.status(200).json({ message: "Login successful", token });
};
