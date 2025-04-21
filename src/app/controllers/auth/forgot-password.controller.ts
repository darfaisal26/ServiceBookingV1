import { Request, Response } from "express";
import prisma from "../../../database/prisma";
import {
  findUserByEmail,
  updateUserResetToken,
} from "../../repositories/auth.repository";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../../utils/email/email";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "No user found with this email." });
      return;
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await updateUserResetToken(user.id, resetToken, resetTokenExpiry);

    // Send password reset email
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetUrl);

    res.status(200).json({ message: "Password reset email sent", resetUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
