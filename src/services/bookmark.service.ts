import { AppDataSource } from "../db/data-source.ts.js";
import { Bookmark } from "../db/entities/bookmark.entity.js";

export const findBookmarkById = async (id: string) => {
  const bookmark = await AppDataSource.getRepository(Bookmark).findOne({
    where: { id },
    relations: ["users"],
  });
  return bookmark;
};
