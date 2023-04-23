import { body } from "express-validator";

export const validateLoginEmail = body("email").isEmail();

export const validateLoginPassword = body("password").isString();
