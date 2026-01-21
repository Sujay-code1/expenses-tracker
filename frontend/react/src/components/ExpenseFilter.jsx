import React from 'react'
const ExpenseFilter = ({filter, setFilter})=>{
    return (
        <div className="flex gap-2 flex-wrap">
            {["all","HighExpense", "LowExpense"].map(f=>(
                <button key={f}
                onClick={() => setFilter(f)}
                className={`py-2 px-4 rounded-lg font-medium transition-all shadow-sm ${
                  filter === f 
                    ? 'bg-red-600 text-white shadow-md' 
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