// model/expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["Food", "Transport", "Rent", "Utilities", "Shopping", "Entertainment", "Medical", "Other"] 
  },
  description: { type: String, trim: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);