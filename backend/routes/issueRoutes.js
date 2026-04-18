import express from "express";
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue,
  updateStatus,
} from "../controllers/issueController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, getIssues);
router.put("/:id", protect, updateIssue);
router.delete("/:id", protect, deleteIssue);
router.patch("/:id/status", protect, updateStatus);

export default router;