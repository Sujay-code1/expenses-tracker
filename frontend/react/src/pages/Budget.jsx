import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setBudgets, setError } from "../store/budgetSlice";

// Component Imports
import BudgetCard from "../components/BudgetCard";
import BudgetTable from "../components/BudgetTable";
import BudgetForm from "../components/BudgetForm";

const Budget = () => {
  const dispatch = useDispatch();
  // Provide a default empty array [] to prevent .reduce errors
  const { budgets = [], isLoading, error } = useSelector((state) => state.budget);
  
  // SAFE Calculation: Check if budgets is an array before reducing
  const totalLimit = Array.isArray(budgets) 
    ? budgets.reduce((acc, b) => acc + (Number(b.limit) || 0), 0) 
    : 0;

  const totalSpent = Array.isArray(budgets) 
    ? budgets.reduce((acc, b) => acc + (Number(b.spent) || 0), 0) 
    : 0;

  const fetchReport = async () => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("http://localhost:5000/api/budget/report", { 
      withCredentials: true 
    });
    // DATA is now { budgets: [...], totalLimit: X, totalSpent: Y }
    // Pass the WHOLE object to Redux
    dispatch(setBudgets(data)); 
  } catch (err) {
    dispatch(setError("Error fetching budget data"));
  }
};

  useEffect(() => {
    fetchReport();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Budget Planning</h2>
          <p className="text-gray-500 text-sm mt-1">Set and monitor your budget limits</p>
        </div>
        <BudgetForm />
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Pass calculated totals to the card */}
      <BudgetCard total={totalLimit} spent={totalSpent} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <BudgetTable budgets={budgets} />
      )}
    </div>
  );
};

export default Budget;