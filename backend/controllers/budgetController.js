import Budget from "../model/budget.js";
import Expense from "../model/expense.js";

// 1. Set or Update a budget
export const setBudget = async (req, res) => {
  const { category, limit } = req.body; // limit comes from frontend form
  const userId = req.user.id;
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  try {
    // We use 'amount' here because your Mongoose Schema uses 'amount'
    const budget = await Budget.findOneAndUpdate(
      { user: userId, category, month, year },
      { amount: Number(limit) }, 
      { upsert: true, new: true }
    );
    
    // After updating, we return the full report so the UI updates instantly
    const report = await fetchReportLogic(userId); 
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error setting budget" });
  }
};

export const getBudgetReport = async (req, res) => {
  try {
    const report = await fetchReportLogic(req.user.id);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper function to keep code clean and totals accurate
const fetchReportLogic = async (userId) => {
  const budgets = await Budget.find({ user: userId });
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const expenses = await Expense.find({
    user: userId,
    date: { $gte: startOfMonth }
  });

  const totalLimit = budgets.reduce((acc, b) => acc + (b.amount || 0), 0);
  const totalSpent = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

  const stats = budgets.map(b => {
    const spentInCategory = expenses
      .filter(e => e.category === b.category)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      category: b.category,
      limit: b.amount, // Changed from .limit to .amount to match Schema
      spent: spentInCategory
    };
  });

  return { budgets: stats, totalLimit, totalSpent };
};