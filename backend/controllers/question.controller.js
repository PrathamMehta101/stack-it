import Question from "../models/question.model.js";
import User from "../models/user.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newQuestion = new Question({
      title,
      description,
      tags,
      author: req.user._id,
    });

    await newQuestion.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { questions: newQuestion._id },
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.log("Error in createQuestion controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("author", "username profilepic")
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error in getAllQuestions controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("author", "username profilePic")
      .populate({
        path: "answers",
        populate: { path: "author", select: "username profilePic" },
      });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.views += 1;
    await question.save();

    res.status(200).json(question);
  } catch (error) {
    console.error("Error in getQuestionById controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    if (
      question.author.toString() != req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this question" });
    }

    await question.deleteOne();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error in deleteQuestion controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
