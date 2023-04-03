import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entity.js";
import { logger } from "../logger/logger.js";
import { UserType } from "../types/user.js";
import { hashPassword } from "../utils/passwordHash.js";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const users: UserType[] = await AppDataSource.getRepository(User).find();
    logger.info(users, "stored users");
    return users;
  } catch (error) {
    logger.error(error);
  }
  // return await AppDataSource.getRepository(User).find();
};

export const findById = async (id: string): Promise<UserType> => {
  const user: UserType = await AppDataSource.getRepository(User).findOneBy({
    id,
  });
  return user;
};

export const createUser = async (userObject): Promise<void> => {
  const { hash, salt } = await hashPassword(userObject.password);

  userObject.password = hash;
  userObject.salt = salt;

  const user = AppDataSource.getRepository(User).create(userObject);
  await AppDataSource.getRepository(User).save(user);
};
