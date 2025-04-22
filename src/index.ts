import express from "express";
import logger from "./utils/logger";
import config from "./config";
import mainRouter from "./app/routes";
import { connectDB, disconnectDB } from "./database/prisma";
import { errorHandler } from "./app/middlewares/error.middleware";
import { ROLE_IDS } from "./config/roles";
import cookieParser from "cookie-parser";

const startServer = async () => {
  console.log(ROLE_IDS["SYSTEM_ADMIN"]);
  try {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    connectDB();

    app.use("/api", mainRouter);

    app.use(errorHandler);

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
