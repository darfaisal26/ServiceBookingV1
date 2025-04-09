import { Request, Response } from "express";
import { getAllUsersService } from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    console.log(users, "userssssssss");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
