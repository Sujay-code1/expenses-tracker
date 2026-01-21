import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ExpenseTable = ({ expenses, onDelete, currentPage, setCurrentPage, itemsPerPage }) => {

  // Calculate pagination
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate visible page range
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    } else {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header matches IncomeTable style */}
            <thead className="bg-red-50/50">
              <tr className="text-sm text-gray-700">
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Spent On</th>
                <th className="px-6 py-4 text-center font-semibold">Category</th>
                <th className="px-6 py-4 text-right font-semibold">Amount</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedExpenses && paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                    No records found for this period.
                  </td>
                </tr>
              ) : (
                paginatedExpenses?.map((exp) => (
                  <tr key={exp._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(exp.date).toLocaleDateString("en-IN", { 
                        day: '2-digit', 
                        month: 'short',
                        year: 'numeric' 
                      })}
                    </td>
                    
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {exp.description || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wide">
                        {exp.category}
                      </span>
                    </td>

                    <td className={`px-6 py-4 text-right font-bold ${Number(exp.amount) >= 10000 ? 'text-blue-600' : 'text-red-600'}`}>
                      ₹{Number(exp.amount).toLocaleString('en-IN' )}
                    
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onDelete(exp._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Expense"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {expenses.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-4 bg-white rounded-xl border border-gray-100">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(endIndex, expenses.length)}
            </span>{" "}
            of <span className="font-semibold">{expenses.length}</span> items
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              {startPage > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    1
                  </button>
                  {startPage > 2 && <span className="text-gray-400">...</span>}
                </>
              )}

              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-red-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;