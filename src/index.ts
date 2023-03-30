import express, { Application } from "express";
import { dbInit } from "./db/initialize.js";
import { logger } from "./logger/logger.js";
import { router } from "./routes/routes.js";

const app: Application = express();
const port: number = Number(process.env.PORT);

dbInit();

app.use(express.json());

app.use("/api", router);

app.listen(port, () => logger.info(`listening on port ${port}`));
