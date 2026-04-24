import { Router } from "express";
import { getProfileSettings, updateProfileSettings } from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.get("/settings", getProfileSettings);
router.put("/settings", updateProfileSettings);

export default router;
