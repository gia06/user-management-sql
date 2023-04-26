import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entities/user.entity.js";
import { logger } from "../logger/logger.js";
import { LoginBody, RegisterBody } from "../types/requestBody.type.js";
import { UserType } from "../types/user.type.js";
import { hashPassword } from "../utils/passwordHash.js";
import { findBookmarkById } from "./bookmark.service.js";

export const getUsers = async (): Promise<User[]> => {
  const users: User[] = await AppDataSource.getRepository(User).find({
    where: { isDeleted: false },
    relations: ["bookmarks"],
  });
  logger.info(users, "stored users");
  return users;
};

export const findUserById = async (id: string): Promise<User> => {
  const user: User = await AppDataSource.getRepository(User).findOne({
    where: { id, isDeleted: false },
    relations: ["bookmarks"],
  });
  console.log(user.bookmarks);
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await AppDataSource.getRepository(User).findOne({
    where: { email, isDeleted: false },
    relations: ["bookmarks"],
  });
};

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterBody): Promise<User> => {
  const user = new User();
  const { hash, salt } = await hashPassword(password);

  user.email = email;
  user.password = hash;
  user.firstName = firstName;
  user.lastName = lastName;
  user.salt = salt;

  await AppDataSource.manager.save(user);
  return user;
};

export const addBookmark = async (
  userId: string,
  bookmarkId: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const storedUser = await findUserById(userId);
  const storedBookmark = await findBookmarkById(bookmarkId);

  storedUser.bookmarks.push(storedBookmark);

  // * only saving user because of cascading *
  await userRepository.save(storedUser);
};

export const removeBookmark = async (
  userId: string,
  bookmarkId: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const storedUser = await findUserById(userId);
  const storedBookmark = await findBookmarkById(bookmarkId);

  storedUser.bookmarks = storedUser.bookmarks.filter(
    (bookmark) => bookmark.id !== storedBookmark.id
  );

  // * only saving user because of cascading *
  await userRepository.save(storedUser);
};

export const authService = async ({
  email,
  password,
}: LoginBody): Promise<User | null> => {
  try {
    const user = await findUserByEmail(email);
    const { hash } = await hashPassword(password, user.salt);

    if (hash !== user.password) return null;

    return user;
  } catch (err) {
    logger.info(err);
    return null;
  }
};

export const loginService = () => {};
