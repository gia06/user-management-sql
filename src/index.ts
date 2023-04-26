import express, { Application } from "express";
import { dbInit } from "./db/initialize.js";
import { logger } from "./logger/logger.js";
import { userRouter } from "./routes/userRoutes.js";
import { swaggerRouter } from "./routes/swaggerRoute.js";
import { bookmarkRouter } from "./routes/bookmarkRoutes.js";

const app: Application = express();
const port: number = Number(process.env.PORT);

dbInit();

app.use(express.json());

app.use("/", swaggerRouter);

app.use("/", userRouter);

app.use("/", bookmarkRouter);

app.listen(port, () => logger.info(`listening on port ${port}`));
