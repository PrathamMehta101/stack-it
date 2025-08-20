import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

export const createAnswer = async (req, res) => {
  try {
    const { body } = req.body;
    const { questionId } = req.params;

    if (!body)
      return res.status(400).json({ message: "Answer body is required" });

    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const newAnswer = new Answer({
      body,
      author: req.user._id,
      question: questionId,
    });

    await newAnswer.save();

    question.answers.push(newAnswer._id);
    await question.save();

    res.status(201).json(newAnswer);
  } catch (error) {
    console.log("Error in createAnswer controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (
      answer.author.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this answer" });
    }

    await answer.deleteOne();

    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: answer._id },
    });

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAnswer controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate("question");
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const question = await Question.findById(answer.question._id);

    if (question.author.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Only question author can accept answer" });
    }

    answer.isAccepted = true;
    await answer.save();

    question.acceptedAnswer = answer._id;
    await question.save();

    res.status(200).json({ message: "Answer accepted successfully", answer });
  } catch (error) {
    console.log("Error in acceptAnswer controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body; // "up" or "down"
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    answer.upvotes = answer.upvotes.filter((u) => u.toString() !== req.user.id);
    answer.downvotes = answer.downvotes.filter(
      (u) => u.toString() !== req.user.id
    );

    if (voteType == "up") {
      answer.upvotes.push(req.user._id);
    } else if (voteType == "down") {
      answer.downvotes.push(req.user._id);
    }

    await answer.save();

    res.status(200).json({ message: "Vote recorded", answer });
  } catch (error) {
    console.log("Error in voteAnswer controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
