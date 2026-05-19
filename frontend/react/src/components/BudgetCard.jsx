import { useTheme } from "../store/ThemeContext";

const BudgetCard = ({ total, spent }) => {
  const progress = total > 0 ? (spent / total) * 100 : 0;
  const { isDark } = useTheme();

  return (
    <div className={`p-6 rounded-xl shadow-sm border transition-colors duration-300 ${
      isDark
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-gray-100"
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>Total Monthly Budget</p>
          <h3 className={`text-3xl font-bold mt-1 transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>₹{total.toLocaleString('en-IN')}</h3>
        </div>
        <div className="md:text-right">
          <p className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>Total Spent</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">₹{spent.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Subtle Progress Bar added for context */}
      <div className={`mt-4 w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-slate-700" : "bg-gray-100"
      }`}>
        <div
          className={`h-full transition-all duration-500 ${progress > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetCard;