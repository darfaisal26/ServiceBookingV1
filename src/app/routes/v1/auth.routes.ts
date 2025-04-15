// src/app/routes/v1/user.routes.ts
import { Router } from "express";
import { registerUser } from "../../controllers/auth/register.controller";
import { loginUser } from "../../controllers/auth/login.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/forgot-password", forgotPasswordController)

export default router;
