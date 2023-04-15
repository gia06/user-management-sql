import { Request, Response } from "express";
import {
  createUser,
  findUserById,
  getUsers,
  loginService,
  updateUser,
} from "../services/users.service.js";

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
export const partialUpdateController = async (req: Request, res: Response) => {
  await updateUser(req.params.id, req.body);
  res.send("updated");
};

// TODO : needs to be completed
export const loginController = async (req: Request, res: Response) => {
  const result = await loginService(req.body);
  console.log(result);
  // await loginService();
};
