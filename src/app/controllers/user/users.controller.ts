import { Request, Response } from "express";
import {
  getAllGendersFromDB,
  getAllUserRolesFromDB,
  getAllUsersFromDB,
  getAdminUsersFromDB,
} from "../../repositories/user.repository";

export const getPublicUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersFromDB();
    if (!users) {
      res.status(502).json({ message: "Database operation failed" });
      return;
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAdminUsersFromDB();
    if (!users) {
      res.status(502).json({ message: "Database operation failed" });
      return;
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getAllUserRolesFromDB();
    if (!roles) {
      res.status(502).json({ message: "Database operation failed" });
      return;
    }

    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllGenders = async (req: Request, res: Response) => {
  try {
    const genders = await getAllGendersFromDB();
    if (!genders) {
      res.status(502).json({ message: "Database operation failed" });
      return;
    }

    res.json(genders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
