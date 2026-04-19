import express from "express";
import {
  createTeam,
  getTeams,
  addMember,
  joinTeam,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTeam);
router.post("/join", protect, joinTeam);
router.get("/", protect, getTeams);
router.post("/:id/add-member", protect, addMember);

export default router;