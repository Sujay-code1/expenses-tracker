import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios.js";
import { setIncome, setLoading as setIncomeLoading, setError as setIncomeError } from "../store/incomeSlice";
import { setExpensesData, setLoading as setExpenseLoading, setError as setExpenseError } from "../store/expenseSlice";
import { Search, CalendarRange, Pencil, Save, X } from "lucide-react";
import TransactionTable from "../components/TransactionTable";
import { useTheme } from "../store/ThemeContext";

const History = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const incomes = useSelector((state) => state.income.list);
  const expenses = useSelector((state) => state.expense.list);
  const incomeLoading = useSelector((state) => state.income.isLoading);
  const expenseLoading = useSelector((state) => state.expense.isLoading);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    category: "",
    source: "",
    description: "",
    frequency: "monthly",
    date: "",
  });

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const loadIncomes = useCallback(async () => {
    dispatch(setIncomeLoading(true));
    try {
      const res = await api.get(`/api/income?month=${month}`);
      dispatch(setIncome(res.data));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load income";
      dispatch(setIncomeError(msg));
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    } finally {
      dispatch(setIncomeLoading(false));
    }
  }, [month, dispatch]);

  const loadExpenses = useCallback(async () => {
    dispatch(setExpenseLoading(true));
    try {
      const res = await api.get(`/api/expense?month=${month}`);
      dispatch(setExpensesData(res.data));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load expenses";
      dispatch(setExpenseError(msg));
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    } finally {
      dispatch(setExpenseLoading(false));
    }
  }, [month, dispatch]);

  useEffect(() => {
    loadIncomes();
    loadExpenses();
  }, [loadIncomes, loadExpenses]);

  const allTransactions = useMemo(() => {
    const merged = [
      ...incomes.map((i) => ({ ...i, type: "income", label: i.source })),
      ...expenses.map((e) => ({ ...e, type: "expense", label: e.description || e.category })),
    ];
    return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [incomes, expenses]);

  const filtered = allTransactions.filter((t) => {
    const matchesSearch = (t.label || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.category || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.source || "").toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    const transactionDate = new Date(t.date);
    const selectedMonth = new Date(month);
    const matchesMonth = transactionDate.getFullYear() === selectedMonth.getFullYear() &&
      transactionDate.getMonth() === selectedMonth.getMonth();
    return matchesSearch && matchesType && matchesMonth;
  });

  const openEdit = (transaction) => {
    setEditingTransaction(transaction);
    setEditForm({
      amount: transaction.amount,
      category: transaction.category || "",
      source: transaction.source || "",
      description: transaction.description || transaction.label || "",
      frequency: transaction.frequency || "monthly",
      date: new Date(transaction.date).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (transaction) => {
    if (!window.confirm(`Delete this ${transaction.type} record?`)) return;

    try {
      await api.delete(`${transaction.type === "income" ? "/api/income" : "/api/expense"}/${transaction._id}`);
      if (transaction.type === "income") {
        dispatch(setIncome(incomes.filter((item) => item._id !== transaction._id)));
      } else {
        dispatch(setExpensesData(expenses.filter((item) => item._id !== transaction._id)));
      }
      import("react-hot-toast").then(({ toast }) => toast.success("Transaction deleted"));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete transaction";
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    }
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    if (!editingTransaction) return;

    const payload = {
      amount: Number(editForm.amount),
      date: editForm.date,
      description: editForm.description,
    };

    if (editingTransaction.type === "income") {
      payload.source = editForm.source;
      payload.frequency = editForm.frequency;
    } else {
      payload.category = editForm.category || editForm.description;
    }

    try {
      await api.put(
        editingTransaction.type === "income" ? `/api/income/${editingTransaction._id}` : `/api/expense/${editingTransaction._id}`,
        payload
      );
      setEditingTransaction(null);
      loadIncomes();
      loadExpenses();
      import("react-hot-toast").then(({ toast }) => toast.success("Transaction updated"));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update transaction";
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Transaction History</h2>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>View all your income and expense transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className={`relative flex items-center rounded-lg border ${isDark ? "border-slate-700 bg-slate-800" : "border-gray-300 bg-white"}`}>
            <CalendarRange className={`absolute left-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={16} />
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDark ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
            />
          </div>

          <div className={`relative flex-1 sm:flex-none ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDark ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400" : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500"}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={`border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDark ? "border-slate-700 bg-slate-800 text-white" : "border-gray-300 bg-white text-gray-700"}`}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
          <select
            className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDark ? "border-slate-700 bg-slate-800 text-white" : "border-gray-300 bg-white text-gray-700"}`}
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>

      {(incomeLoading || expenseLoading) ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className={`ml-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Loading transactions...</span>
        </div>
      ) : (
        <TransactionTable
          data={filtered}
          itemsPerPage={itemsPerPage}
          controlledPage={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {editingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingTransaction(null)} />
          <div className={`relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${isDark ? "border-slate-700 bg-slate-800 text-white" : "border-gray-200 bg-white text-gray-900"}`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Pencil className="text-indigo-500" size={18} />
                <h3 className="text-xl font-bold">Edit {editingTransaction.type === "income" ? "Income" : "Expense"}</h3>
              </div>
              <button onClick={() => setEditingTransaction(null)} className={`rounded-lg p-2 ${isDark ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Amount</label>
                <input type="number" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`} required />
              </div>

              {editingTransaction.type === "income" ? (
                <>
                  <div>
                    <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Source</label>
                    <input value={editForm.source} onChange={(e) => setEditForm({ ...editForm, source: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`} required />
                  </div>
                  <div>
                    <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Frequency</label>
                    <select value={editForm.frequency} onChange={(e) => setEditForm({ ...editForm, frequency: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`}>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Category</label>
                  <input value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`} required />
                </div>
              )}

              <div>
                <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Description</label>
                <input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`} />
              </div>

              <div>
                <label className={`block mb-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>Date</label>
                <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className={`w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? "border-slate-700 bg-slate-700 text-white" : "border-gray-200 bg-white text-gray-800"}`} required />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditingTransaction(null)} className={`px-4 py-2 rounded-xl ${isDark ? "bg-slate-700 text-gray-200" : "bg-gray-100 text-gray-700"}`}>Cancel</button>
                <button type="submit" className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"><Save size={16} /> Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;