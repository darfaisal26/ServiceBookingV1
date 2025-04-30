import { Request, Response } from 'express';
import {
  getAllSkills as getAllSkillsRepo,
  getSkillById as getSkillByIdRepo, 
  createSkill as createSkillRepo, 
  updateSkill as updateSkillRepo, 
  deleteSkill as deleteSkillRepo,
  toggleSkillStatus as toggleSkillStatusRepo,
} from "../../repositories/skill.repository";

export const getAllSkillsController = async (req: Request, res: Response) => {
  const skills = await getAllSkillsRepo();
  res.json(skills);
};

export const getSkillByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const skill = await getSkillByIdRepo(id);
  if (!skill) {
    res.status(404).json({ message: "skill not found" });
    return;
  }
  res.json(skill);
};

export const createSkillController = async (req: Request, res: Response) => {
  const { skill_name } = req.body;
  const newService = await createSkillRepo(skill_name);
  res.status(201).json(newService);
};

export const updateSkillController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { skill_name, is_active } = req.body;
  try {
    const updated = await updateSkillRepo(id, skill_name, is_active);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: "skill not found" });
  }
};

export const deleteSkillController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await deleteSkillRepo(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: "skill not found" });
  }
};

export const toggleSkillStatusController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { is_active } = req.body;

  if (typeof is_active !== "boolean") {
    res.status(400).json({ message: "is_active must be a boolean" });
    return;
  }

  try {
    const updated = await toggleSkillStatusRepo(id, is_active);
    res.json({
      message: `skill ${is_active ? "activated" : "deactivated"}`,
      skill: updated,
    });
  } catch (error) {
    res.status(404).json({ message: "skill not found" });
  }
};
