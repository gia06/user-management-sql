import { CustomValidator, param } from "express-validator";
import { findUserById } from "../services/users.service.js";

const idValidator: CustomValidator = async (id: string) => {
  const user = await findUserById(id);
  if (!user) {
    return Promise.reject("User with this id doesn't exist");
  }
};

export const validateId = param("id").isString().custom(idValidator);
