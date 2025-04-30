import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../../controllers/servicess/service.controller";

const router = Router();

router.get("/getallservices", getAllServices);
router.get("/getserviceById/:id", getServiceById);
router.post("/createservice", createService);
router.put("/updateservice/:id", updateService);
router.delete("/deleteservice/:id", deleteService);
router.post("/:id/status", toggleServiceStatus);


export default router;
