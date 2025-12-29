import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// ADDED removeExpense to the imports here
import { setExpensesData, setLoading, setError, removeExpense } from "../store/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseCard from "../components/ExpenseCard";

const Expense = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.expense);
  
  // Logic to ensure Card matches Table exactly
  const calculatedTotal = list && list.length > 0 
    ? list.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) 
    : 0;

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const loadData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await axios.get(`http://localhost:5000/api/expense?month=${month}`, {
        withCredentials: true,
      });
      dispatch(setExpensesData(res.data)); 
    } catch (err) {
      console.error("Expense Load Error:", err);
      dispatch(setError(err.response?.data?.message || "Failed to load expenses"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // CORRECTED: Combined logic for a smooth delete experience
  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:5000/api/expense/${id}`, { 
          withCredentials: true 
        });
        
        // 1. Instantly remove from Redux (UI feels fast)
        dispatch(removeExpense(id)); 
        
        // 2. Refresh from backend to ensure the "totalSpent" from server is in sync
        loadData(); 
      } catch (err) {
        console.error("Delete Error:", err);
        alert(err.response?.data?.message || "Failed to delete expense");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [month, dispatch]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Expense Tracker</h2>
        <div className="flex flex-wrap gap-3">
          <input 
            type="month" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <ExpenseForm />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Card shows the calculated sum of the current table rows */}
      <ExpenseCard total={calculatedTotal} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <ExpenseTable expenses={list} onDelete={handleDeleteExpense} />
      )}
    </div>
  );
};

export default Expense;