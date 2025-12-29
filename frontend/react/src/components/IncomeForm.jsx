import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncome } from "../store/incomeSlice";
import { X } from "lucide-react";
import axios from "axios";

const IncomeForm = () => {
  const dispatch = useDispatch();
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
      const res = await axios.post("http://localhost:5000/api/income", form, {
        withCredentials: true,
      });

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-7 space-y-6 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Add New Income</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Source</label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Salary, Freelance..."
                  value={form.source}
                  onChange={e => setForm({ ...form, source: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Date</label>
                <input 
                  type="date" 
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={form.date} // FIXED: Changed from formData.date to form.date
                  onChange={(e) => setForm({ ...form, date: e.target.value })} // FIXED: Changed from setFormData to setForm
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Amount</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="₹ Amount"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Frequency</label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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