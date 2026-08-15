import React, { useState, useEffect } from "react";
import api from "../utils/axios.js";
import { useDispatch } from "react-redux";
import { setBudgets, setError } from "../store/budgetSlice";
import { X, Plus, Target, Edit, Wallet } from "lucide-react";
import { toast } from "react-hot-toast";

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Shopping", "Entertainment", "Insurance", "Car Service", "Fuel", "Medical", "Other"];

const BudgetForm = ({ editBudget = null, onClose = null, onRefresh = null, month = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(editBudget ? editBudget.category : "Food");
  const [amount, setAmount] = useState(editBudget ? editBudget.limit.toString() : "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editBudget) {
      setCategory(editBudget.category);
      setAmount(editBudget.limit.toString());
      setIsOpen(true);
    }
  }, [editBudget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedCategory = category.trim();

    if (!trimmedCategory || !amount || Number(amount) <= 0) {
      toast.error("Please enter a valid category and budget amount");
      return;
    }

    try {
      let response;
      if (editBudget) {
        response = await api.put("/api/budget/update", { category: trimmedCategory, limit: Number(amount), month: month });
      } else {
        response = await api.post("/api/budget/set", { category: trimmedCategory, limit: Number(amount), month: month });
      }

      dispatch(setBudgets(response.data));
      setCategory("Food");
      setAmount("");
      setIsOpen(false);
      if (onClose) onClose();
      toast.success(editBudget ? "Budget updated successfully!" : "Budget created successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to ${editBudget ? 'update' : 'create'} budget`;
      dispatch(setError(msg));
      toast.error(msg);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setAmount("");
    setCategory(editBudget ? editBudget.category : "Food");
    if (onClose) onClose();
  };

  if (editBudget) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Edit className="text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-slate-800">Edit Budget</h3>
                </div>
                <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    Category
                  </label>
                  <input
                    list="budget-category-list"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Car Service, Insurance"
                    required
                  />
                  <datalist id="budget-category-list">
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    Monthly Limit (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]">
                  Update Budget
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 text-sm shadow-sm"
      >
        <Wallet size={18} strokeWidth={2.5} />
        Set Category Budget
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />

          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Target className="text-blue-600" size={20} />
                <h3 className="text-xl font-bold text-slate-800">Set Budget</h3>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <input
                  list="budget-category-list"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Car Service, Insurance"
                  required
                />
                <datalist id="budget-category-list">
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Monthly Limit (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]">
                Save Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetForm;