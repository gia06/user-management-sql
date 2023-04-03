import crypto from "crypto";
import { logger } from "../logger/logger.js";
import { Hash } from "../types/hash.js";

export const hashPassword = (password: string): Promise<Hash> => {
  const salt = crypto.randomBytes(128).toString("base64");

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        logger.error(err);
        reject(err);
      }

      const hash = derivedKey.toString("hex");

      resolve({ hash, salt });
    });
  });
};
