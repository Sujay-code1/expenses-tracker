import { useTheme } from "../store/ThemeContext";

const ExpenseCard = ({ total }) => {
  const { isDark } = useTheme();

  return (
    <div className={`p-6 rounded-xl shadow-sm transition-colors duration-300 ${
      isDark 
        ? "bg-slate-800 border-slate-700" 
        : "bg-white border-gray-100"
    } border`}>
      <div className="flex flex-col">
        <p className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>Total Monthly Spending</p>
        <h3 className="text-3xl font-bold text-red-500 mt-1">
          ₹{Number(total).toLocaleString('en-IN')}
        </h3>
        <p className={`text-xs mt-2 italic transition-colors duration-300 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>Based on selected month</p>
      </div>
    </div>
  );
};
export default ExpenseCard;