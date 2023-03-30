import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.DB_PWD,
  database: "user_management",
  entities: [User],
  synchronize: true,
  logging: true,
});
