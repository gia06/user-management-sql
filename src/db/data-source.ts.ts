import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/userEntity.js";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PWD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PWD,
  database: DB_NAME,
  entities: [User],
  synchronize: true,
  logging: true,
});
