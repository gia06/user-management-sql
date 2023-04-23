import { NextFunction, Request, Response } from "express";
import { authService } from "../services/users.service.js";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await authService(req.body);

  if (!user || !user) {
    res
      .status(400)
      .json({ message: "Authentication failed, wrong credentials" });
  }
  res.locals.user = user;
  next();
};
