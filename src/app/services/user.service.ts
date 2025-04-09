import { findAllUsers } from "../repositories/user.repository";
export const getAllUsersService = async () => {
  try {
    return await findAllUsers();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};
