import Budget from "../model/budget.js";
import Expense from "../model/expense.js";

// 1. Set or Update a budget
export const setBudget = async (req, res) => {
  const { category, limit, month } = req.body; // limit comes from frontend form
  const userId = req.user.id;

  let monthNum, yearNum;
  if (month) {
    const [year, monthStr] = month.split('-');
    monthNum = parseInt(monthStr) - 1; // Convert to 0-based month
    yearNum = parseInt(year);
  } else {
    monthNum = new Date().getMonth();
    yearNum = new Date().getFullYear();
  }

  try {
    // We use 'amount' here because your Mongoose Schema uses 'amount'
    const budget = await Budget.findOneAndUpdate(
      { user: userId, category, month: monthNum, year: yearNum },
      { amount: Number(limit) },
      { upsert: true, new: true }
    );

    // After updating, we return the full report so the UI updates instantly
    const report = await fetchReportLogic(userId, month);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error setting budget" });
  }
};

// 2. Update an existing budget
export const updateBudget = async (req, res) => {
  const { category, limit, month } = req.body;
  const userId = req.user.id;

  let monthNum, yearNum;
  if (month) {
    const [year, monthStr] = month.split('-');
    monthNum = parseInt(monthStr) - 1; // Convert to 0-based month
    yearNum = parseInt(year);
  } else {
    monthNum = new Date().getMonth();
    yearNum = new Date().getFullYear();
  }

  try {
    const budget = await Budget.findOneAndUpdate(
      { user: userId, category, month: monthNum, year: yearNum },
      { amount: Number(limit) },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const report = await fetchReportLogic(userId, month);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error updating budget" });
  }
};

// 3. Reset/Delete a budget
export const resetBudget = async (req, res) => {
  const { category, month } = req.body;
  const userId = req.user.id;

  let monthNum, yearNum;
  if (month) {
    const [year, monthStr] = month.split('-');
    monthNum = parseInt(monthStr) - 1; // Convert to 0-based month
    yearNum = parseInt(year);
  } else {
    monthNum = new Date().getMonth();
    yearNum = new Date().getFullYear();
  }

  try {
    await Budget.findOneAndDelete({ user: userId, category, month: monthNum, year: yearNum });

    const report = await fetchReportLogic(userId, month);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error resetting budget" });
  }
};

// 4. Get paginated budget report
export const getBudgetReport = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { month } = req.query;

    const userId = req.user.id;

    // Build query for filtering by month
    const query = { user: userId };
    if (month) {
      const [year, monthNum] = month.split('-');
      query.month = parseInt(monthNum) - 1; // Convert to 0-based month
      query.year = parseInt(year);
    } else {
      // Default to current month if no month specified
      query.month = new Date().getMonth();
      query.year = new Date().getFullYear();
    }

    const budgets = await Budget.find(query).skip(skip).limit(limit);

    // Get all budgets for the selected month for totals calculation
    const allBudgets = await Budget.find(query);

    const startOfMonth = new Date();
    if (month) {
      const [year, monthNum] = month.split('-');
      startOfMonth.setFullYear(parseInt(year));
      startOfMonth.setMonth(parseInt(monthNum) - 1);
    }
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startOfMonth, $lt: endOfMonth }
    });

    // Calculate totals from ALL budgets for the selected month, not just paginated ones
    const totalLimit = allBudgets.reduce((acc, b) => acc + (b.amount || 0), 0);
    const totalSpent = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

    const stats = budgets.map(b => {
      const spentInCategory = expenses
        .filter(e => e.category === b.category)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        category: b.category,
        limit: b.amount,
        spent: spentInCategory
      };
    });

    const totalBudgets = await Budget.countDocuments(query);
    const totalPages = Math.ceil(totalBudgets / limit);

    res.json({
      budgets: stats,
      totalLimit,
      totalSpent,
      pagination: {
        currentPage: page,
        totalPages,
        totalBudgets,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper function to keep code clean and totals accurate
const fetchReportLogic = async (userId, month = null) => {
  // Build query for filtering by month
  const query = { user: userId };
  if (month) {
    const [year, monthNum] = month.split('-');
    query.month = parseInt(monthNum) - 1; // Convert to 0-based month
    query.year = parseInt(year);
  } else {
    // Default to current month if no month specified
    query.month = new Date().getMonth();
    query.year = new Date().getFullYear();
  }

  const budgets = await Budget.find(query);

  const startOfMonth = new Date();
  if (month) {
    const [year, monthNum] = month.split('-');
    startOfMonth.setFullYear(parseInt(year));
    startOfMonth.setMonth(parseInt(monthNum) - 1);
  }
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const expenses = await Expense.find({
    user: userId,
    date: { $gte: startOfMonth, $lt: endOfMonth }
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