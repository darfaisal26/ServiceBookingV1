import { Router } from "express";
import { registerUser } from "../../controllers/auth/register.controller";
import { loginUser } from "../../controllers/auth/login.controller";
import { forgotPasswordController } from "../../controllers/auth/forgot-password.controller";
import { resetPasswordController } from "../../controllers/auth/reset-password.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;
