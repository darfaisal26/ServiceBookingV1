import prisma from "../../database/prisma";
import { Prisma, PrismaClient, User } from "@prisma/client";

import { UserRegistrationInput } from "../../schemas/auth.schema";
import { DefaultArgs } from ".prisma/client/runtime/library";

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
  // return await prisma.user.create({
  //   data: userData,
  // });
  const result = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: userData,
    });
    await createProfileBasedOnRole(tx, userData.roleId, createdUser.id);
    return createdUser;
  });

  return result;
};

const createProfileBasedOnRole = async (tx: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">, roleId: number, userId: number) => {
  switch (roleId) {
    case 1: // Client
      await tx.clientProfile.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
      break;
    case 2: // Worker
      await tx.workerProfile.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
      break;
    case 3: // System Admin
      await tx.systemAdminProfile.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
      break;
    case 4: // Driver
      await tx.driverProfile.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
      break;
    default:
      throw new Error("Invalid role id provided");
  }
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
