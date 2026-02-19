import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import TransactionTable from "../components/TransactionTable";

const History = () => {
  // Pulling from your existing Redux slices
  const incomes = useSelector((state) => state.income.list);
  const expenses = useSelector((state) => state.expense.list);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  // Merge and Sort Logic
  const allTransactions = useMemo(() => {
    const merged = [
      ...incomes.map((i) => ({ ...i, type: "income", label: i.source })),
      ...expenses.map((e) => ({ ...e, type: "expense", label: e.description })),
    ];
    return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [incomes, expenses]);

  // Filtering Logic
  const filtered = allTransactions.filter((t) => {
    const matchesSearch = t.label?.toLowerCase().includes(search.toLowerCase()) ||
                          t.category?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    
    // Month filtering
    const transactionDate = new Date(t.date);
    const selectedMonth = new Date(month);
    const matchesMonth = transactionDate.getFullYear() === selectedMonth.getFullYear() &&
                        transactionDate.getMonth() === selectedMonth.getMonth();
    
    return matchesSearch && matchesType && matchesMonth;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-500 text-sm mt-1">View all your income and expense transactions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Month Selector */}
          <input 
            type="month" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-gray-600"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
      </div>

      {/* Reusable Table Component */}
      <TransactionTable data={filtered} />
    </div>
  );
};

export default History;