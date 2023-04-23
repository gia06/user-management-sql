import { body } from "express-validator";
import { registerEmailValidator } from "./customValidators.js";

export const validateRegisterEmail = body("email")
  .isEmail()
  .custom(registerEmailValidator);

export const validateRegisterPassword = body("password")
  .isLength({ min: 5 })
  .withMessage("must be at least 5 chars long");
