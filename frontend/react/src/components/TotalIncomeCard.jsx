import { useTheme } from "../store/ThemeContext";

const TotalIncomeCard = ({ incomes }) => {
  const total = incomes.reduce((sum,i)=>sum+Number(i.amount),0);
  const { isDark } = useTheme();

  return (
    <div className={`p-5 rounded-lg shadow transition-colors duration-300 ${
      isDark ? "bg-slate-800" : "bg-white"
    }`}>
      <h4 className={`transition-colors duration-300 ${
        isDark ? "text-gray-400" : "text-gray-500"
      }`}>Total Income</h4>
      <p className="text-3xl font-bold text-green-600">₹ {total}</p>
    </div>
  );
};

export default TotalIncomeCard;
