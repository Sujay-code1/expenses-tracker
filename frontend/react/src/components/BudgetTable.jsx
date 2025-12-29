import React from "react";

const BudgetTable = ({ budgets = [] }) => {
  // Return early if no data to prevent mapping errors
  if (!budgets || budgets.length === 0) {
    return <div className="p-10 text-center text-gray-400 font-medium">No budget goals found.</div>;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100">
      <table className="w-full text-left bg-white border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-center">Monthly Limit</th>
            <th className="px-6 py-4 text-center">Actual Spent</th>
            <th className="px-6 py-4 text-right">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {budgets.map((b, index) => {
            const usage = b.limit > 0 ? (b.spent / b.limit) * 100 : 0;
            return (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800">{b.category}</td>
                <td className="px-6 py-4 text-center text-gray-600 font-medium">₹{b.limit}</td>
                <td className="px-6 py-4 text-center text-gray-600 font-medium">₹{b.spent}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-[11px] font-black px-3 py-1 rounded-full ${usage > 100 ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                    {Math.round(usage)}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;