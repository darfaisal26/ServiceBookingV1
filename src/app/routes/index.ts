import { Router } from "express";
import v1Routes from "./v1";

const router = Router();

router.use("/v1", v1Routes);

// Add future versions here
// router.use('/v2', v2Routes);

export default router;
