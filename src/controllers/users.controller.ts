import { Request, Response } from "express";
import {
  createUser,
  findUserById,
  getUsers,
  // loginService,
  addBookmark,
  removeBookmark,
} from "../services/users.service.js";
import { signJwt } from "../utils/jwt.js";

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

//TODO : need updating after login route
export const addBookmarkController = async (req: Request, res: Response) => {
  const { userId, bookmarkId } = req.query;
  await addBookmark(userId.toString(), bookmarkId.toString());
  res.send("updated");
};

export const removeBookmarkController = async (req: Request, res: Response) => {
  const { userId, bookmarkId } = req.query;
  await removeBookmark(userId.toString(), bookmarkId.toString());
  res.send("updated");
};

// TODO : needs to be completed
export const loginController = async (req: Request, res: Response) => {
  // const { isAuthenticated } = await loginService(req.body);
  // signJwt();
  // await loginService();
};
