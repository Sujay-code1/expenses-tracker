import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const TransactionTable = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <table className="w-full border-collapse">
        {/* Header matches your Income/Expense table headers */}
        <thead className="bg-indigo-50">
          <tr className="text-sm text-gray-700">
            <th className="px-6 py-4 text-left font-semibold">Date</th>
            <th className="px-6 py-4 text-left font-semibold">Details</th>
            <th className="px-6 py-4 text-center font-semibold">Type</th>
            <th className="px-6 py-4 text-right font-semibold">Amount</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{t.label}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    {t.category || t.frequency || "General"}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    t.type === "income" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                  }`}>
                    {t.type === "income" ? <ArrowUpCircle size={12} /> : <ArrowDownCircle size={12} />}
                    {t.type}
                  </span>
                </td>

                <td className={`px-6 py-4 text-right font-bold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {t.type === "income" ? "+" : "-"} ₹{Number(t.amount).toLocaleString("en-IN")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-10 text-center text-gray-400">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;