import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  source: {
    type: String,
    required: true, // Salary, Freelance, Business, etc.
  },

  amount: {
    type: Number,
    required: true,
  },

  frequency: {
    type: String,
    enum: ["one-time", "weekly", "monthly", "yearly"],
    default: "one-time",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  description: String,
}, { timestamps: true });

export default mongoose.model("Income", incomeSchema);
