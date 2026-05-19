

import React from "react";
import { useSelector } from "react-redux";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import StatCard from "../components/StatCard";
import { useTheme } from "../store/ThemeContext";

const Dashboard = () => {
  const incomes = useSelector((state) => state.income.list);
  const expenses = useSelector((state) => state.expense.list);
  const { isDark } = useTheme();

  // Calculate Totals
  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl sm:text-4xl font-bold transition-colors duration-300 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>Dashboard Overview</h1>
        <p className={`text-base mt-2 transition-colors duration-300 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>Welcome back! Here is your financial summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
