import { useState } from "react";
import api from "../utils/axios.js"; 
import { useDispatch } from "react-redux";
import { addExpenseToState } from "../store/expenseSlice";
import { Plus, X, WalletCards } from "lucide-react";
import { useTheme } from "../store/ThemeContext"; 
import { toast } from "react-hot-toast";

const CATEGORY_SUGGESTIONS = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Medical",
  "Insurance",
  "Car Service",
  "Fuel",
  "Travel",
  "Other",
];

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleAmountChange = (e) => {
    const nextValue = e.target.value;
    if (nextValue === "" || /^\d*\.?\d{0,2}$/.test(nextValue)) {
      setFormData((prev) => ({ ...prev, amount: nextValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedCategory = String(formData.category || "").trim();
    const trimmedDescription = String(formData.description || "").trim();
    const amountValue = Number(formData.amount);

    if (!trimmedCategory) {
      toast.error("Please enter a category");
      return;
    }

    if (!formData.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const payload = {
        amount: amountValue,
        category: trimmedCategory,
        description: trimmedDescription,
        date: formData.date || new Date().toISOString().split("T")[0],
      };

      const res = await api.post("/api/expense", payload);
      dispatch(addExpenseToState(res.data));
      toast.success("Expense added");
      setFormData({ amount: "", category: "", description: "", date: new Date().toISOString().split("T")[0] });
      setIsOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add expense";
      toast.error(msg);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg font-medium cursor-pointer"
      >
        <WalletCards size={18} /> Add Expense
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          <div className={`relative rounded-3xl p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-300 border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-50'}`}>
            <button 
              onClick={() => setIsOpen(false)}
              className={`absolute top-5 right-5 transition-colors ${isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-blue-600'}`}
            >
              <X size={24} />
            </button>

            <h3 className={`text-2xl font-bold mb-6 transition-colors ${isDark ? 'text-white' : 'text-blue-900'}`}>New Expense</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className={`text-sm font-semibold ml-1 transition-colors ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDark ? 'bg-slate-700 border border-slate-600 text-white focus:bg-slate-600' : 'bg-blue-50/50 border border-blue-100 focus:bg-white'}`}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className={`text-sm font-semibold ml-1 transition-colors ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>Amount (₹)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-semibold ${isDark ? 'bg-slate-700 border border-slate-600 text-white focus:bg-slate-600' : 'bg-blue-50/50 border border-blue-100 focus:bg-white'}`}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className={`text-sm font-semibold ml-1 transition-colors ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>Category</label>
                <input
                  list="expense-category-list"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDark ? 'bg-slate-700 border border-slate-600 text-white focus:bg-slate-600' : 'bg-blue-50/50 border border-blue-100 focus:bg-white'}`}
                  placeholder="e.g. Car Service, Insurance"
                  required
                />
                <datalist id="expense-category-list">
                  {CATEGORY_SUGGESTIONS.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-1">
                <label className={`text-sm font-semibold ml-1 transition-colors ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>Description</label>
                <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDark ? 'bg-slate-700 border border-slate-600 text-white focus:bg-slate-600' : 'bg-blue-50/50 border border-blue-100 focus:bg-white'}`}
                  placeholder="e.g. Dinner with friends"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 py-3 rounded-xl hover:opacity-80 font-medium transition-colors ${isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="cursor-pointer flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-bold shadow-blue-200 shadow-xl transition-all active:scale-95"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseForm;