import prisma from "../../database/prisma";
export const getAdminUsersFromDB = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      iqamaNo: true,
      iqamaExpiry: true,
      roleId: true,
      genderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
export const getAllUsersFromDB = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const getAllUserRolesFromDB = async () => {
  return await prisma.role.findMany();
};

export const getAllGendersFromDB = async () => {
  return await prisma.genderMaster.findMany();
};
