// controllers/expenseController.js
import Expense from "../model/expense.js";

export const addExpense = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Please login again to add an expense" });
    }

    const { amount, category, description, date } = req.body;
    const parsedAmount = Number(amount);
    const cleanCategory = String(category || "").trim();
    const cleanDescription = typeof description === "string" ? description.trim() : "";

    if (!cleanCategory) {
      return res.status(400).json({ message: "Expense category is required" });
    }

    if (!parsedAmount || parsedAmount <= 0) {
      return res.status(400).json({ message: "Expense amount must be greater than 0" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      amount: parsedAmount,
      category: cleanCategory,
      description: cleanDescription,
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json(expense);
  } catch (error) {
    console.error("Add expense error:", error);
    return res.status(500).json({
      message: error?.message || "Failed to add expense",
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { month } = req.query;
    const userId = req.user.id;

    const query = { user: userId }; // Model uses 'user', not 'userId'
    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    const totalSpent = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    res.status(200).json({
      expenses: expenses,
      totalSpent: totalSpent 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (Number(amount) > 0) expense.amount = Number(amount);
    if (category) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date) expense.date = new Date(date);

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};