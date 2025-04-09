import express from "express";
import logger from "./utils/logger";
import config from "./config";
import mainRouter from "./app/routes";
import { connectDB, disconnectDB } from "./database/prisma";

const startServer = async () => {
  try {
    const app = express();

    app.use(express.json());

    connectDB();

    app.use("/api", mainRouter);

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
