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
