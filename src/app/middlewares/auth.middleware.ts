import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        roleId: number;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Authentication Required" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        roleId: true,
        refreshToken: true,
      },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    req.user = { id: user.id, roleId: user.roleId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
