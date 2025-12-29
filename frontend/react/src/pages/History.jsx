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
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-7 space-y-6">
      {/* Header Section matching your other pages */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        
        <div className="flex items-center gap-3">
          {/* Search Input styled like your other forms */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type Filter */}
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