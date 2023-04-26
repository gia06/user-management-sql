import { query } from "express-validator";
import {
  belongsToUserValidator,
  bookmarkValidator,
  idValidator,
} from "./customValidators.js";

export const validateUserIdQuery = query("userId")
  .isString()
  .custom(idValidator);

export const validateBookmarkIdQuery = query("bookmarkId")
  .isString()
  .custom(bookmarkValidator);

export const validateBelongsToUser = query("userId").custom(
  belongsToUserValidator
);
