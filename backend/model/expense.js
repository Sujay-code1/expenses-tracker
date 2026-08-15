// model/expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);