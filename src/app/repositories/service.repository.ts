import prisma from "../../database/prisma";


export const getAllServices = async () => {
  return prisma.serviceMaster.findMany();
};

export const getServiceById = async (id: number) => {
  return prisma.serviceMaster.findUnique({
    where: { id },
  });
};

export const createService = async (service_name: string) => {
  return prisma.serviceMaster.create({
    data: { service_name },
  });
};

export const updateService = async (
  id: number,
  service_name: string,
  is_active?: boolean
) => {
  return prisma.serviceMaster.update({
    where: { id },
    data: {
      service_name,
      ...(is_active !== undefined && { is_active }),
    },
  });
};

export const deleteService = async (id: number) => {
  return prisma.serviceMaster.delete({
    where: { id },
  });
};

export const toggleServiceStatus = async (id: number, is_active: boolean) => {
  return prisma.serviceMaster.update({
    where: { id },
    data: { is_active },
  });
};
