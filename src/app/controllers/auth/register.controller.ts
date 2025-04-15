import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../../utils/auth";
import {
  createUser,
  updateUserRefreshToken,
  findUserByEmail,
} from "../../repositories/auth.repository";
import { userRegistrationSchema } from "../../../schemas/auth.schema";
import * as z from "zod";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validationResult = userRegistrationSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        errors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }
    const {
      name,
      email,
      password,
      phoneNumber,
      iqamaNo,
      iqamaExpiry,
      genderId,
      age,
      roleId,
    } = validationResult.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
      iqamaNo: iqamaNo || null,
      iqamaExpiry: iqamaExpiry || null,
      genderId: genderId,
      age: age ? String(age) : null,
      roleId: roleId,
      refreshToken: null, // Explicitly initialize
      resetToken: null,
      resetTokenExpiry: null,
    });

    if (!newUser) {
      res.status(500).json({ message: "Unable to create user" });
      return;
    }

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    await updateUserRefreshToken(newUser.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ accessToken });
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
