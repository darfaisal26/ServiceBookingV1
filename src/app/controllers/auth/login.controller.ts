import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../../utils/auth";

import { userLoginSchema } from "../../../schemas/auth.schema";
import * as z from "zod";
import {
  findUserByEmail,
  updateUserRefreshToken,
} from "../../repositories/auth.repository";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = userLoginSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        errors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }
    const { email, password } = validationResult.data;

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password!
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    const accessToken = generateAccessToken(existingUser.id);
    const refreshToken = generateRefreshToken(existingUser.id);

    await updateUserRefreshToken(existingUser.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (error: any) {
    console.error(error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.flatten().fieldErrors,
      });
      return;
    }

    res.status(500).json({ error: error.message });
  }
};
