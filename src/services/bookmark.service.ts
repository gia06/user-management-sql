import { AppDataSource } from "../db/data-source.ts.js";
import { Bookmark } from "../db/entities/bookmark.entity.js";
import { BookmarkType } from "../types/bookmark/bookmark.type.js";

export const findBookmarks = async (): Promise<Bookmark[]> => {
  const bookmarks: Bookmark[] = await AppDataSource.getRepository(
    Bookmark
  ).find({
    where: { isDeleted: false },
    relations: ["users"],
  });

  return bookmarks;
};

export const findBookmarkById = async (
  id: string
): Promise<Bookmark | null> => {
  const bookmark = await AppDataSource.getRepository(Bookmark).findOne({
    where: { id },
    relations: ["users"],
  });
  return bookmark;
};

export const createBookmark = async ({
  title,
  thumbnail,
  year,
  category,
  rating,
  isTrending,
}: BookmarkType) => {
  const bookmark = new Bookmark();

  bookmark.title = title;
  bookmark.thumbnail = thumbnail;
  bookmark.year = year;
  bookmark.category = category;
  bookmark.rating = rating;
  bookmark.isTrending = isTrending;

  await AppDataSource.getRepository(Bookmark).save(bookmark);
};
