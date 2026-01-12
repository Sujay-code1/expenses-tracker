// controllers/expenseController.js
import Expense from "../model/expense.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = await Expense.create({
      user: req.user._id,
      amount: Number(amount),
      category,
      description,
      date: date || new Date(),
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
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

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};