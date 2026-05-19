import { useTheme } from "../store/ThemeContext";

const IncomeFilter = ({ filter, setFilter }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-3">
      {["all","monthly","weekly","one-time","yearly"].map(f => (
        <button key={f}
          onClick={()=>setFilter(f)}
          className={`px-4 py-2 rounded transition-colors ${
            filter===f
              ? "bg-indigo-600 text-white"
              : isDark
              ? "bg-slate-700 text-gray-300 hover:bg-slate-600 shadow-sm"
              : "bg-white shadow hover:bg-gray-50"
          }`}>
          {f}
        </button>
      ))}
    </div>
  );
};


export default IncomeFilter;