import jwt from "jsonwebtoken";
import { Payload } from "../types/jwt.type.js";
import "dotenv";
import { logger } from "../logger/logger.js";

const { JWT_KEY } = process.env;

export const signJwt = (payload: Payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_KEY,
      { algorithm: "HS256", expiresIn: "6h" },
      (err, jwt) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.info({ jwt }, "token");
        resolve(jwt);
      }
    );
  });
};
