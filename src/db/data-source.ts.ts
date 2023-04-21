import "reflect-metadata";
import { DataSource } from "typeorm";
import { Bookmark } from "./entities/bookmark.entity.js";
import { User } from "./entities/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PWD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PWD,
  database: DB_NAME,
  entities: [User, Bookmark],
  synchronize: true,
  logging: true,
});
