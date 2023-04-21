import { CustomValidator, body } from "express-validator";
import { findUserByEmail } from "../services/users.service.js";

const emailValidator: CustomValidator = async (email: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    return Promise.reject("E-mail already in use");
  }
};

export const validateEmail = body("email").isEmail().custom(emailValidator);

export const validatePassword = body("password")
  .isLength({ min: 5 })
  .withMessage("must be at least 5 chars long");
