import { logger } from "../logger/logger.js";
import { AppDataSource } from "./data-source.ts.js";

export const dbInit = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("connected to database...");
  } catch (err) {
    logger.error(`failed to connect to db ${err}`);
  }
};
