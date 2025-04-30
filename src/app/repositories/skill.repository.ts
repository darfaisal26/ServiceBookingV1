import prisma from "../../database/prisma";


export const getAllSkills = async () => {
  return prisma.skillMaster.findMany();
};

export const getSkillById = async (id: number) => {
  return prisma.skillMaster.findUnique({
    where: { id },
  });
};

export const createSkill = async (skill_name: string) => {
  return prisma.skillMaster.create({
    data: { skill_name },
  });
};

export const updateSkill = async (
  id: number,
  skill_name: string,
  is_active?: boolean
) => {
  return prisma.skillMaster.update({
    where: { id },
    data: {
      skill_name,
      ...(is_active !== undefined && { is_active }),
    },
  });
};

export const deleteSkill = async (id: number) => {
  return prisma.skillMaster.delete({
    where: { id },
  });
};

export const toggleSkillStatus = async (id: number, is_active: boolean) => {
  return prisma.skillMaster.update({
    where: { id },
    data: { is_active },
  });
};
