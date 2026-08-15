import React, { useState, useEffect } from "react";
import { useTheme } from "../store/ThemeContext";
import { ArrowUpCircle, ArrowDownCircle, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

const TransactionTable = ({
  data = [],
  itemsPerPage = 10,
  controlledPage = null,
  onPageChange = null,
  onEdit = null,
  onDelete = null,
}) => {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(controlledPage || 1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  useEffect(() => {
    if (typeof controlledPage === "number" && controlledPage !== currentPage) {
      setCurrentPage(controlledPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledPage]);

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePrevious = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-indigo-600 text-white"
              : isDark
              ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className={`shadow-lg rounded-xl overflow-hidden border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
      <table className="w-full border-collapse">
        <thead className={isDark ? "bg-slate-700" : "bg-gray-50"}>
          <tr className={`text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>
            <th className="px-6 py-4 text-left font-semibold">Date</th>
            <th className="px-6 py-4 text-left font-semibold">Details</th>
            <th className="px-6 py-4 text-center font-semibold">Type</th>
            <th className="px-6 py-4 text-right font-semibold">Amount</th>
            <th className="px-6 py-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className={isDark ? "divide-y divide-slate-700" : "divide-y divide-gray-200"}>
          {currentData.length > 0 ? (
            currentData.map((t) => (
              <tr key={t._id} className={`transition-colors ${isDark ? "hover:bg-slate-700" : "hover:bg-gray-50"}`}>
                <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <div className={`font-medium ${isDark ? "text-gray-100" : "text-gray-800"}`}>{t.label}</div>
                  <div className={`text-xs capitalize ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.category || t.frequency || "General"}</div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      t.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type === "income" ? <ArrowUpCircle size={12} /> : <ArrowDownCircle size={12} />}
                    {t.type}
                  </span>
                </td>

                <td className={`px-6 py-4 text-right font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"} ₹{Number(t.amount).toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(t)}
                        className={`rounded-lg p-2 transition-colors ${isDark ? "text-blue-300 hover:bg-slate-700" : "text-blue-600 hover:bg-blue-50"}`}
                        title="Edit Record"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(t)}
                        className={`rounded-lg p-2 transition-colors ${isDark ? "text-red-300 hover:bg-slate-700" : "text-red-600 hover:bg-red-50"}`}
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={`py-10 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={`flex items-center justify-between px-6 py-4 ${isDark ? "bg-slate-900/40" : "bg-gray-50"}`}>
          <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${isDark ? "bg-slate-700 text-gray-200 disabled:opacity-40" : "bg-white border border-gray-300 text-gray-700 disabled:opacity-50"}`}
            >
              <ChevronLeft size={16} />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${isDark ? "bg-slate-700 text-gray-200 disabled:opacity-40" : "bg-white border border-gray-300 text-gray-700 disabled:opacity-50"}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
