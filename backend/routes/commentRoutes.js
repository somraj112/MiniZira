import express from "express";
import {
  addComment,
  getComments,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:issueId", protect, addComment);
router.get("/:issueId", protect, getComments);

export default router;