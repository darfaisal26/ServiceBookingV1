import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  findUserByResetToken,
  updateUserPassword,
} from "../../repositories/auth.repository";

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await findUserByResetToken(token);

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(user.id, hashedPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
