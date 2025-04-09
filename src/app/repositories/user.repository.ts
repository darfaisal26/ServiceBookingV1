import prisma from "../../database/prisma";
export const findAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error("Database operation failed");
  }
};
