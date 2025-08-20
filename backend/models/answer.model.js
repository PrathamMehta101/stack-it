import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    body: {
      type: String, // HTML from React-Quill rich text editor
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // users who upvoted this answer
      },
    ],
    downvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // users who downvoted this answer
      },
    ],
    isAccepted: {
      type: Boolean,
      default: false, // will be true if marked accepted by question author
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
