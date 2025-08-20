import express from "express";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.post("/:questionId", protectRoute, createAnswer);
router.delete("/:id", protectRoute, deleteAnswer);
router.put("/:id/accept", protectRoute, acceptAnswer);
router.put("/:id/vote", protectRoute, voteAnswer);

export default router;
