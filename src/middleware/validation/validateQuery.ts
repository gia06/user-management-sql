import { query } from "express-validator";
import { bookmarkValidator, userValidator } from "./customValidators.js";

export const validateUserId = query("userId").isString().custom(userValidator);

export const validateBookmarkId = query("bookmarkId")
  .isString()
  .custom(bookmarkValidator);
