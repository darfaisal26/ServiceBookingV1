// src/app/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import prisma from "../../database/prisma";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth";

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
): Promise<void> => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req?.cookies?.refreshToken;
  if (!accessToken && !refreshToken) {
    res.status(401).json({ error: "Authentication Required" });
    return;
  }
  try {
    const decoded = jwt.verify(
      accessToken!,
      process.env.JWT_SECRET!
    ) as JwtPayload & {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, roleId: true },
    });

    if (!user) throw new Error("Invalid token");

    req.user = { id: user.id, roleId: user.roleId };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      await handleTokenRefresh(req, res, next, refreshToken);
      return;
    }

    res
      .status(401)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ error: "Invalid token" });
  }
};

async function handleTokenRefresh(
  req: Request,
  res: Response,
  next: NextFunction,
  refreshToken?: string
): Promise<void> {
  console.log("got in handle token refresh");

  if (!refreshToken) {
    res.status(401).json({ error: "Session expired. Please log in again" });
    return;
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload & { userId: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId, refreshToken },
      select: { id: true, roleId: true, refreshToken: true },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });
    console.log("got in handle token refresh 4");
    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

    req.user = { id: user.id, roleId: user.roleId };
    next();
  } catch (error) {
    res
      .status(401)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ error: "Session expired. Please log in again" });
  }
}
