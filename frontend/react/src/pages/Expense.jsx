import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// ADDED removeExpense to the imports here
import { setExpensesData, setLoading, setError, removeExpense } from "../store/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseFilter from "../components/ExpenseFilter";

const Expense = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.expense);
  const [filter, setFilter] = useState("all");
  
  //pagination
  const itemsPerPage = 8;
  // Logic to ensure Card matches Table exactly
  const calculatedTotal = list && list.length > 0 
    ? list.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) 
    : 0;

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
  }, [month, dispatch]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filtered = list.filter(expense=>{
    if(filter === "all") return true;
    if(filter === "HighExpense") return Number(expense.amount) >= 10000;
    if(filter === "LowExpense") return Number(expense.amount) < 10000;
    return true;
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Expense Tracker</h2>
          <p className="text-gray-500 text-sm mt-1">Track and manage your daily expenses</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input 
            type="month" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
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
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-700">Filter by Amount</h3>
          <ExpenseFilter filter={filter} setFilter={setFilter}/>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <ExpenseTable 
          expenses={filtered} 
          onDelete={handleDeleteExpense}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Expense;