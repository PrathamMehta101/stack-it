import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
} from "../controllers/question.controller";

const router = express.Router();

router.post("/", protectRoute, createQuestion);
router.post("/:id", protectRoute, deleteQuestion);

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

export default router;
