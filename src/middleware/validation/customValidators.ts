import { CustomValidator } from "express-validator";
import { findUserByEmail, findUserById } from "../../services/users.service.js";
import { findBookmarkById } from "../../services/bookmark.service.js";

export const idValidator: CustomValidator = async (id: string) => {
  const user = await findUserById(id);
  if (!user) return Promise.reject("User with this id doesn't exist");
};

export const registerEmailValidator: CustomValidator = async (
  email: string
) => {
  const user = await findUserByEmail(email);
  if (user) return Promise.reject("E-mail already in use");
};

export const bookmarkValidator: CustomValidator = async (
  bookmarkIid: string
) => {
  const bookmark = await findBookmarkById(bookmarkIid);

  if (!bookmark) return Promise.reject("Bookmark with this id doesn't exist");
};

export const belongsToUserValidator: CustomValidator = async (
  value,
  { req }
) => {
  const { userId, bookmarkId } = req.query;

  const user = await findUserById(userId);
  const bookmark = await findBookmarkById(bookmarkId);

  user.bookmarks.map((userBookmark) => {
    if (userBookmark.id === bookmark.id)
      throw new Error("This item is already bookmarked");
  });
};
