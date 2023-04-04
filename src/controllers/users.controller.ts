import { Request, Response } from "express";
import { logger } from "../logger/logger.js";
import { createUser, findById, getUsers } from "../services/users.service.js";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
};

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
};
