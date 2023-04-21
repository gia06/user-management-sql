import { Request, Response, NextFunction } from "express";
import { CustomValidator, query } from "express-validator";
import { findUserById } from "../services/users.service.js";
import { findBookmarkById } from "../services/bookmark.service.js";

const userValidator: CustomValidator = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) return Promise.reject("User with this id doesn't exist");
};

const bookmarkValidator: CustomValidator = async (bookmarkIid: string) => {
  const bookmark = await findBookmarkById(bookmarkIid);

  if (!bookmark) return Promise.reject("Bookmark with this id doesn't exist");
};

export const validateUserId = query("userId").isString().custom(userValidator);

export const validateBookmarkId = query("bookmarkId")
  .isString()
  .custom(bookmarkValidator);
