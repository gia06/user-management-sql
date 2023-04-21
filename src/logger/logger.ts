import { pino } from "pino";
import * as dotenv from "dotenv";

dotenv.config();

const pretty = process.env.PRETTY_LOGGING
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
    }
  : {};

export const logger = pino(pretty);
