import { param } from "express-validator";
import { idValidator } from "./customValidators.js";

export const validateIdParam = param("id").isString().custom(idValidator);
