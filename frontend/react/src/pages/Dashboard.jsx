

import React from "react";
import { useSelector } from "react-redux";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const incomes = useSelector((state) => state.income.list);
  const expenses = useSelector((state) => state.expense.list);

  // Calculate Totals
  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here is your financial summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Income" 
          amount={totalIncome} 
          icon={<TrendingUp size={24} />} 
          color="text-green-600" 
          bgColor="bg-green-50"
        />
        
        <StatCard 
          title="Total Expense" 
          amount={totalExpense} 
          icon={<TrendingDown size={24} />} 
          color="text-red-600" 
          bgColor="bg-red-50"
        />

        <StatCard 
          title="Net Balance" 
          amount={balance} 
          icon={<Wallet size={24} />} 
          color="text-indigo-600" 
          bgColor="bg-indigo-50"
        />
      </div>

      {/* You can add a Recent Transactions list or Charts here later */}
    </div>
  );
};

export default Dashboard;
