import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
} from "../controllers/posts.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.get("/", listPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
