import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth";
import {
  createUser,
  updateUserRefreshToken,
  findUserByEmail,
} from "../repositories/auth.repository";

export const registerUserService = async (userData: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  iqamaNo: string;
  iqamaExpiry: Date;
  genderId: number;
  age: string;
  roleId: number;
}) => {
  const existingUser = await findUserByEmail(userData.email);
  console.log(existingUser, "existing user");

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    phoneNumber: userData.phoneNumber || null,
    iqamaNo: userData.iqamaNo || null,
    iqamaExpiry: userData.iqamaExpiry || null,
    genderId: userData.genderId,
    age: userData.age ? String(userData.age) : null,
    roleId: userData.roleId,
    refreshToken: null, // Explicitly initialize
    resetToken: null,
    resetTokenExpiry: null,
  });

  const accessToken = generateAccessToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);

  await updateUserRefreshToken(newUser.id, refreshToken);

  return { accessToken, refreshToken, user: newUser };
};
