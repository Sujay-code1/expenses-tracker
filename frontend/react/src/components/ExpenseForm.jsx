import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addExpenseToState } from "../store/expenseSlice";
import { Plus, X } from "lucide-react"; 

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/expense", formData, {
        withCredentials: true,
      });
      
      dispatch(addExpenseToState(res.data));
      setFormData({ amount: "", category: "Food", description: "", date: new Date().toISOString().split("T")[0] });
      setIsOpen(false); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <>
      {/* The Main Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg font-medium"
      >
        <Plus size={20} /> Add Expense
      </button>

      {/* The Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* THE OVERLAY: Changed from black to a deep blue-transparent tint */}
          <div 
            className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} 
          ></div>

          {/* THE MODAL CONTENT */}
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-300 border border-blue-50">
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-blue-900 mb-6">New Expense</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-blue-800 ml-1">Amount (₹)</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-blue-50/50 border border-blue-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-lg font-semibold" 
                  placeholder="0.00"
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-blue-800 ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-blue-50/50 border border-blue-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                 color="blue">
                  <option value="Food"> Food</option>
                  <option value="Transport"> Transport</option>
                  <option value="Rent"> Rent</option>
                  <option value="Utilities"> Utilities</option>
                  <option value="Shopping"> Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Medical"> Medical</option>
                  <option value="Other"> Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-blue-800 ml-1">Description</label>
                <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-blue-50/50 border border-blue-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="e.g. Dinner with friends"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-50 text-gray-500 py-3 rounded-xl hover:bg-gray-100 font-medium transition-colors"
                >
                
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-bold shadow-blue-200 shadow-xl transition-all active:scale-95"
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