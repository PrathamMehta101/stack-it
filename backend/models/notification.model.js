import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who receives the notification
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who triggered it (e.g., answered, upvoted, etc.)
      required: true,
    },
    type: {
      type: String,
      enum: [
        "answer_posted",
        "answer_upvoted",
        "answer_accepted",
        "question_upvoted",
        "mention",
        "system",
      ],
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      default: null,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },
    message: {
      type: String, // custom text for flexibility
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
