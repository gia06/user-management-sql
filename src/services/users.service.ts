import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entity.js";
import { logger } from "../logger/logger.js";

export const getUsers = async () => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    // logger.info(`stored users: ${{ ...users }}`);
    logger.info(users, "stored users");
    return users;
  } catch (error) {
    logger.error(error);
  }
  // return await AppDataSource.getRepository(User).find();
};

export const createUser = async (userObject) => {
  const user = AppDataSource.getRepository(User).create(userObject);
  await AppDataSource.getRepository(User).save(user);
};
