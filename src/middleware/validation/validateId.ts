import { param } from "express-validator";
import { idValidator } from "./customValidators.js";

export const validateId = param("id").isString().custom(idValidator);
