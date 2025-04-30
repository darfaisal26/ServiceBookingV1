import { Router } from 'express';
import {
  getAllSkillsController,
  getSkillByIdController,
  createSkillController,
  updateSkillController,
  deleteSkillController,
  toggleSkillStatusController,
} from "../../controllers/skills/skill.controller";

const router = Router();

router.get("/getallskills", getAllSkillsController);
router.get("/getskillById/:id", getSkillByIdController);
router.post("/createskill", createSkillController);
router.put("/updateskill/:id", updateSkillController);
router.delete("/deleteskill/:id", deleteSkillController);
router.post("/:id/status", toggleSkillStatusController);


export default router;
