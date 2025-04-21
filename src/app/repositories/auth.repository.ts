import prisma from "../../database/prisma";
import { User } from "@prisma/client";

import { UserRegistrationInput } from "../../schemas/auth.schema";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findUserByResetToken = async (token: string) => {
  return await prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
  });
};

export const updateUserPassword = async (
  userId: number,
  hashedPassword: string
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
};

export const createUser = async (userData: UserRegistrationInput) => {
  return await prisma.user.create({
    data: userData,
  });
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
