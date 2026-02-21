import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setBudgets, setError } from "../store/budgetSlice";

// Component Imports
import BudgetCard from "../components/BudgetCard";
import BudgetTable from "../components/BudgetTable";
import BudgetForm from "../components/BudgetForm";

const Budget = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  // Provide a default empty array [] to prevent .reduce errors
  const { budgets = [], totalLimit, totalSpent, pagination, isLoading, error } = useSelector((state) => state.budget);

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const fetchReport = useCallback(async (page = 1) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`http://localhost:5000/api/budget/report?page=${page}&limit=10&month=${month}`, {
        withCredentials: true
      });
      // DATA is now { budgets: [...], totalLimit: X, totalSpent: Y, pagination: {...} }
      // Pass the WHOLE object to Redux
      dispatch(setBudgets(data));
    } catch (err) {
      dispatch(setError("Error fetching budget data"));
    }
  }, [dispatch, month]);

  useEffect(() => {
    fetchReport(currentPage);
  }, [fetchReport, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    setCurrentPage(1); // Reset to first page when month changes
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Budget Planning</h2>
          <p className="text-gray-500 text-sm mt-1">Set and monitor your budget limits</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="month"
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
          />
          <BudgetForm month={month} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Pass calculated totals to the card */}
      <BudgetCard total={totalLimit || 0} spent={totalSpent || 0} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <BudgetTable
          budgets={budgets}
          pagination={pagination}
          onPageChange={handlePageChange}
          onRefresh={() => fetchReport(currentPage)}
          month={month}
        />
      )}
    </div>
  );
};

export default Budget;