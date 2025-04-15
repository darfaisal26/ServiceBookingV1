import prisma from "../../database/prisma";
import { User } from "@prisma/client";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (userData: Omit<User, "id">) => {
  return await prisma.user.create({ data: userData });
};

export const updateUserRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

export const updateUserResetToken = async (
  userId: number,
  resetToken: string,
  resetTokenExpiry: Date
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { resetToken, resetTokenExpiry },
  });
};
