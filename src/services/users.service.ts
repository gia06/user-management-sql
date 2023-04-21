import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entities/user.entity.js";
import { logger } from "../logger/logger.js";
import { LoginBody, RegisterBody } from "../types/requestBody.type.js";
import { LoginResult } from "../types/service.type.js";
import { UserType } from "../types/user.type.js";
import { hashPassword } from "../utils/passwordHash.js";
import { findBookmarkById } from "./bookmark.service.js";

export const getUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = await AppDataSource.getRepository(User).find();
  logger.info(users, "stored users");
  return users;
};

export const findUserById = async (id: string): Promise<User> => {
  const user: User = await AppDataSource.getRepository(User).findOne({
    where: { id },
    relations: ["bookmarks"],
  });
  return user;
};

export const findUserByEmail = async (
  email: string
): Promise<UserType | null> => {
  return await AppDataSource.getRepository(User).findOneBy({ email });
};

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterBody): Promise<UserType> => {
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

  await userRepository.save(storedUser);

  console.log(storedUser, storedBookmark);
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

  await userRepository.save(storedUser);
};

export const authService = async ({
  email,
  password,
}: LoginBody): Promise<LoginResult> => {
  const user = await findUserByEmail(email);
  const { hash } = await hashPassword(password, user.salt);

  if (hash !== user.password) return { isAuthenticated: false };

  return { isAuthenticated: true };
};

const loginService = () => {};
