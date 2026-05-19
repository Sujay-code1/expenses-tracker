import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncome } from "../store/incomeSlice";
import { X } from "lucide-react";
import api from "../utils/axios.js";
import { useTheme } from "../store/ThemeContext"; 

const IncomeForm = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  
  // Initial state helper to keep code clean
  const initialState = { 
    source: "", 
    date: new Date().toISOString().split("T")[0], 
    amount: "", 
    frequency: "monthly" 
  };

  const [form, setForm] = useState(initialState);

  const submit = async () => {
    if (!form.source || !form.amount) {
      alert("Please fill in Source and Amount");
      return;
    }

    try {
      const res = await api.post("/api/income", form);

      dispatch(addIncome(res.data)); 
      
      setOpen(false);
      setForm(initialState); // Reset to initial state including the date
    } catch (err) {
      console.error("Failed to save income:", err.response?.data || err.message);
      alert("Error saving income to database");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2.5 rounded-lg shadow-sm"
      >
        + Add Income
      </button>

      {open && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isDark ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm`}>
          <div className={`w-full max-w-md rounded-xl shadow-lg p-7 space-y-6 relative transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-xl font-semibold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Income</h3>
              <button onClick={() => setOpen(false)} className={`transition-colors ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Source</label>
                <input
                  className={`mt-1 w-full rounded-lg border p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                  placeholder="Salary, Freelance..."
                  value={form.source}
                  onChange={e => setForm({ ...form, source: e.target.value })}
                />
              </div>

              <div>
                <label className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</label>
                <input 
                  type="date" 
                  className={`mt-1 w-full rounded-lg border p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div>
                <label className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Amount</label>
                <input
                  type="number"
                  className={`mt-1 w-full rounded-lg border p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                  placeholder="₹ Amount"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                />
              </div>

              <div>
                <label className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Frequency</label>
                <select
                  className={`mt-1 w-full rounded-lg border p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                  value={form.frequency}
                  onChange={e => setForm({ ...form, frequency: e.target.value })}
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="one-time">One-time</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <button
              onClick={submit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium shadow"
            >
              Save Income
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeForm;