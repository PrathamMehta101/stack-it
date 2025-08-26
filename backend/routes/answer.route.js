import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  acceptAnswer,
  createAnswer,
  deleteAnswer,
  voteAnswer,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/:questionId", protectRoute, createAnswer);
router.delete("/:id", protectRoute, deleteAnswer);
router.put("/:id/accept", protectRoute, acceptAnswer);
router.put("/:id/vote", protectRoute, voteAnswer);

export default router;
