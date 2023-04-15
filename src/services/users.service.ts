import { AppDataSource } from "../db/data-source.ts.js";
import { User } from "../db/entities/userEntity.js";
import { logger } from "../logger/logger.js";
import { LoginBody, RegisterBody } from "../types/requestBody.js";
import { LoginResult } from "../types/service.js";
import { UserType } from "../types/user.js";
import { hashPassword } from "../utils/passwordHash.js";

export const getUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = await AppDataSource.getRepository(User).find();
  logger.info(users, "stored users");
  return users;
};

export const findUserById = async (id: string): Promise<UserType | null> => {
  const user: UserType = await AppDataSource.getRepository(User).findOneBy({
    id,
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

//TODO : need updating after login route
export const updateUser = async (id: string, requestBody): Promise<void> => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id });
  AppDataSource.getRepository(User).merge(user, requestBody);
  await AppDataSource.getRepository(User).save(user);
};

export const loginService = async ({
  email,
  password,
}: LoginBody): Promise<LoginResult> => {
  const user = await findUserByEmail(email);
  const { hash } = await hashPassword(password, user.salt);
  console.log(hash, user.password);

  if (hash !== user.password) return { isAuthenticated: false };
  return { isAuthenticated: true };
};
