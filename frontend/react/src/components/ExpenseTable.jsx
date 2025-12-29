import { Trash2 } from "lucide-react";

const ExpenseTable = ({ expenses, onDelete }) => {
  return (
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
            {expenses && expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                  No records found for this period.
                </td>
              </tr>
            ) : (
              expenses?.map((exp) => (
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

                  <td className="px-6 py-4 text-right font-bold text-red-600">
                    ₹{Number(exp.amount).toLocaleString('en-IN')}
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
  );
};

export default ExpenseTable;