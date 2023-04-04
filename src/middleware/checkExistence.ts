import { Request, Response, NextFunction } from "express";
import { findByEmail, findById } from "../services/users.service.js";
import { UserType } from "../types/user.js";

export const checkExistenceByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: UserType | null = await findByEmail(req.body.email);

  const error = {
    error: [
      {
        msg: "user by this email already exists",
      },
    ],
  };

  user ? res.status(400).json(error) : next();
};

export const checkExistenceByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: UserType | null = await findById(req.params.id);

  if (!user) {
    res.status(400).json({
      errors: [
        {
          msg: "user by this id doesn't exist",
        },
      ],
    });
  }
  res.locals.user = user;
  next();
};
