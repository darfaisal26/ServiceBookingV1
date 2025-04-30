import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import serviceRoutes from "./service.route";
import skillRoutes from "./skill.route";
const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/skills", skillRoutes);

export default router;
