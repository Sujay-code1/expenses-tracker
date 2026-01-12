import Expense from "../model/expense.js";
import Income from "../model/incomeModel.js";

export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch both in parallel for speed
    const [expenses, incomes] = await Promise.all([
      Expense.find({ user: userId }),
      Income.find({ user: userId })
    ]);

    // Label them so the frontend can color-code them
    const taggedExpenses = expenses.map(e => ({ ...e._doc, type: 'expense' }));
    const taggedIncomes = incomes.map(i => ({ ...i._doc, type: 'income' }));

    // Combine and sort by date descending
    const history = [...taggedExpenses, ...taggedIncomes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction history" });
  }
};