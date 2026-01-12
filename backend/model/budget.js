import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    default: new Date().getMonth(), // 0 = Jan, 11 = Dec
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
}, { timestamps: true });

// Prevent duplicate budgets for the same category in the same month
budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);