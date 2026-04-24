import { Router } from "express";
import { getAnalyticsSummary } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.get("/summary", getAnalyticsSummary);

export default router;
