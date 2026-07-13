import React, { useState } from "react";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import BudgetForm from "./BudgetForm";
import api from "../utils/axios.js";
import { toast } from "react-hot-toast";
import { useTheme } from "../store/ThemeContext";

const BudgetTable = ({ budgets = [], pagination = {}, onPageChange, onRefresh, month }) => {
  const [editingBudget, setEditingBudget] = useState(null);

  // Return early if no data to prevent mapping errors
  if (!budgets || budgets.length === 0) {
    const monthName = month ? new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'this month';
    return (
      <div className="p-10 text-center">
        <div className="text-gray-400 font-medium mb-2">No budget goals found for {monthName}</div>
        <div className="text-sm text-gray-500">Set your monthly budget limits to start tracking your spending.</div>
      </div>
    );
  }

  const handleEdit = (budget) => {
    setEditingBudget(budget);
  };

  const { isDark } = useTheme();

  const handleEditClose = () => {
    setEditingBudget(null);
  };

  const handleReset = async (category) => {
    if (window.confirm(`Are you sure you want to reset the budget for ${category}?`)) {
      try {
        const response = await api.delete("/api/budget/reset", { data: { category, month } });
        if (response.status === 200) {
          if (onRefresh) onRefresh(); else window.location.reload();
          toast.success("Budget reset successfully");
        } else {
          toast.error("Failed to reset budget");
        }
      } catch (error) {
        console.error("Error resetting budget:", error);
        toast.error("Error resetting budget");
      }
    }
  };

  return (
    <>
    <div className={`w-full overflow-hidden rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-100 bg-white'}`}>
      <table className="w-full text-left border-collapse">
        <thead className={`${isDark ? 'bg-slate-700 border-b border-slate-700' : 'bg-gray-50 border-b border-gray-100'}`}>
          <tr className={`${isDark ? 'text-[10px] font-black uppercase tracking-widest text-gray-300' : 'text-[10px] font-black uppercase tracking-widest text-gray-400'}`}>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Monthly Limit</th>
              <th className="px-6 py-4 text-center">Actual Spent</th>
              <th className="px-6 py-4 text-right">Usage</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
        <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-gray-50'}`}>
          {budgets.map((b, index) => {
            const usage = b.limit > 0 ? (b.spent / b.limit) * 100 : 0;
            return (
              <tr key={index} className={`transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                <td className={`px-6 py-4 font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{b.category}</td>
                <td className={`px-6 py-4 text-center font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>₹{b.limit}</td>
                <td className={`px-6 py-4 text-center font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>₹{b.spent}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[11px] font-black px-3 py-1 rounded-full ${usage > 100 ? (isDark ? 'bg-red-800 text-red-300' : 'bg-red-50 text-red-500') : (isDark ? 'bg-slate-700 text-blue-300' : 'bg-blue-50 text-blue-600')}`}>
                      {Math.round(usage)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(b)}
                        className={`p-1 rounded transition-colors ${isDark ? 'text-blue-300 hover:bg-slate-700' : 'text-blue-600 hover:bg-blue-50'}`}
                        title="Edit budget"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleReset(b.category)}
                        className={`p-1 rounded transition-colors ${isDark ? 'text-red-300 hover:bg-slate-700' : 'text-red-600 hover:bg-red-50'}`}
                        title="Reset budget"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalBudgets)} of {pagination.totalBudgets} budgets
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingBudget && (
        <BudgetForm
          editBudget={editingBudget}
          onClose={handleEditClose}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default BudgetTable;