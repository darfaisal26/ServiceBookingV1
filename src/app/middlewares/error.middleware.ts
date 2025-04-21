import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[${new Date().toISOString()}] ${err.stack}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error:
      process.env.NODE_ENV === "production" ? "An error occured" : err.message,
  });
};
