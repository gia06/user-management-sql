import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entity.js";
import { logger } from "../logger/logger.js";
import { RequestBody, UserType } from "../types/user.js";
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

export const findByEmail = async (email: string) => {
  return await AppDataSource.getRepository(User).findOneBy({ email });
};

export const createUser = async ({
  email,
  password,
}: RequestBody): Promise<void> => {
  const user = new User();
  const { hash, salt } = await hashPassword(password);

  user.email = email;
  user.password = hash;
  user.salt = salt;

  await AppDataSource.manager.save(user);
};
