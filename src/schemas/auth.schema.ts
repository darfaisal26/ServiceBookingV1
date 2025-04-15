import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number (10 digits required)"),

  iqamaNo: z
    .string()
    .min(10, "Iqama number must be at least 10 characters")
    .max(20, "Iqama number cannot exceed 20 characters"),

  iqamaExpiry: z.coerce
    .date()
    .min(new Date(), "Iqama expiry must be in the future"),

  genderId: z
    .number()
    .int("Gender ID must be an integer")
    .positive("Invalid gender ID"),

  age: z.coerce
    .number()
    .int("Age must be an integer")
    .min(18, "Minimum age is 18")
    .max(120, "Invalid age"),

  roleId: z
    .number()
    .int("Role ID must be an integer")
    .positive("Invalid role ID"),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
