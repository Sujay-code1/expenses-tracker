import Income from "../model/incomeModel.js";

export const addIncome = async (req, res) => {
  const { source, amount, frequency, date, description } = req.body;

  const income = await Income.create({
    user: req.user.id,
    source,
    amount,
    frequency,
    date: date || new Date(), 
    description,
  });

  res.status(201).json(income);
};

export const getIncomes = async (req, res) => {
  try {
    const { month } = req.query;
    const userId = req.user.id;

    const query = { user: userId };
    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const incomes = await Income.find(query).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    // Security: Check if the record belongs to the user
    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this record" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
