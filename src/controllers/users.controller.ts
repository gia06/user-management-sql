import { Request, Response } from "express";
import { logger } from "../logger/logger.js";
import { createUser, getUsers } from "../services/users.service.js";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export const createUserController = async (req: Request, res: Response) => {
  logger.info(req.body);
  const user = await createUser(req.body);
  res.status(201).json(user);
};
