import { Request, Response } from "express";
import {
  findBookmarkById,
  findBookmarks,
} from "../services/bookmark.service.js";

export const getBookmarksController = async (req: Request, res: Response) => {
  const bookmarks = await findBookmarks();
  res.json(bookmarks);
};

export const getBookmarkByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const bookmark = await findBookmarkById(id);
  res.json(bookmark);
};
