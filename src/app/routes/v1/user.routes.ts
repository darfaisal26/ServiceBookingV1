import { Router } from "express";
import {
  getAllGenders,
  getAllRoles,
  getAdminUsers,
  getPublicUsers,
} from "../../controllers/user/users.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/roles.middlewares";

const router = Router();

router.get("/public/users", getPublicUsers);
router.get(
  "/admin/users",
  authenticate,
  authorize(["SYSTEM_ADMIN"]),
  getAdminUsers
);
router.get("/getAllRoles", getAllRoles);
router.get("/getAllGenders", getAllGenders);

export default router;
