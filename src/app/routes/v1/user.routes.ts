// src/app/routes/v1/user.routes.ts
import { Router } from "express";
import { getAllUsers } from "../../controllers/users.controller";
// import UserController from "../../controllers/user.controller";
// import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

// Initialize Controller
// const userController = new UserController();

// GET /api/v1/users
// router.get("/", authenticate, userController.getAllUsers);

// POST /api/v1/users
// router.post("/", userController.createUser);

// PUT /api/v1/users/:id
// router.put("/:id", authenticate, userController.updateUser);
router.get("/getAllUsers", getAllUsers);

export default router;
