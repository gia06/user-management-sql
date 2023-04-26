import express from "express";
import {
  getBookmarkByIdController,
  getBookmarksController,
} from "../controllers/bookmarks.controller.js";

export const bookmarkRouter = express.Router();

bookmarkRouter.get("/bookmarks", getBookmarksController);

bookmarkRouter.get("/bookmarks/:bookmarkId", getBookmarkByIdController);
