import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBudgets, setError } from "../store/budgetSlice";
import { X, Plus, Target } from "lucide-react";

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Shopping", "Entertainment", "Other"];

const BudgetForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  // The missing handleUpdate function
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Safety check for empty amount
    if (!amount || amount <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }

    try {
      // 1. Send data to the backend
      await axios.post(
        "http://localhost:5000/api/budget/set",
        { 
          category: category, 
          limit: Number(amount) // Ensure this matches your backend field name (limit or amount)
        },
        { withCredentials: true }
      );

      // 2. Refresh the list from the server to keep UI in sync
      const { data } = await axios.get("http://localhost:5000/api/budget/report", { 
        withCredentials: true 
      });
      
      // 3. Update Redux store
      dispatch(setBudgets(data));
      
      // 4. Reset form and close modal
      setAmount("");
      setIsOpen(false);
      alert("Budget updated successfully!");

    } catch (err) {
      console.error("Save Error:", err.response?.data);
      dispatch(setError(err.response?.data?.message || "Failed to update budget"));
    }
  };

  return (
    <>
      {/* THE BUTTON: This triggers the popup */}
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 text-sm shadow-sm"
      >
        <Plus size={18} strokeWidth={2.5} />
        Set Category Budget
      </button>

      {/* THE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center gap-2">
                <Target className="text-blue-600" size={20} />
                <h3 className="text-xl font-bold text-slate-800">Set Budget</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Monthly Limit (₹)
                </label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
              >
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