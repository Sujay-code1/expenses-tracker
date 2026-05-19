import React from 'react'
import { useTheme } from "../store/ThemeContext";

const ExpenseFilter = ({filter, setFilter})=>{
    const { isDark } = useTheme();
    return (
        <div className="flex gap-2 flex-wrap">
            {["all","HighExpense", "LowExpense"].map(f=>(
                <button key={f}
                onClick={() => setFilter(f)}
                className={`py-2 px-4 rounded-lg font-medium transition-all shadow-sm ${
                  filter === f 
                    ? 'bg-red-600 text-white shadow-md' 
                    : isDark
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                   {f}
                </button>
            ))}
        </div>
    )
}

export default ExpenseFilter;