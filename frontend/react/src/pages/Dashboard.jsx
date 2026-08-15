

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { TrendingUp, TrendingDown, Wallet, BarChart3, Sparkles } from "lucide-react";
import StatCard from "../components/StatCard";
import { useTheme } from "../store/ThemeContext";
import { getTodayTopEntries } from "../utils/dashboardUtils";

const Dashboard = () => {
  const incomes = useSelector((state) => state.income.list);
  const expenses = useSelector((state) => state.expense.list);
  const { isDark } = useTheme();

  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  const todayExpenses = useMemo(() => getTodayTopEntries(expenses, "expense", 3), [expenses]);
  const todayIncome = useMemo(() => getTodayTopEntries(incomes, "income", 3), [incomes]);

  const renderChart = (items, accent) => {
    if (!items.length) {
      return (
        <div className={`rounded-2xl border border-dashed p-6 text-center ${isDark ? "border-slate-700 bg-slate-800/70 text-slate-300" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
          No data available for today
        </div>
      );
    }

    const maxAmount = Math.max(...items.map((item) => Number(item.amount || 0)), 1);

    return items.map((item, index) => (
      <div key={`${item._id || item.label}-${index}`} className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className={isDark ? "text-slate-200" : "text-slate-700"}>{item.label}</span>
          <span className={accent === "green" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>₹{Number(item.amount).toLocaleString("en-IN")}</span>
        </div>
        <div className={`h-2.5 rounded-full ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
          <div
            className={`h-full rounded-full ${accent === "green" ? "bg-gradient-to-r from-emerald-400 to-green-600" : "bg-gradient-to-r from-rose-400 to-red-500"}`}
            style={{ width: `${(Number(item.amount) / maxAmount) * 100}%` }}
          />
        </div>
      </div>
    ));
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard title="Total Income" amount={totalIncome} icon={<TrendingUp size={24} />} color="text-green-600" bgColor="bg-green-50" />
        <StatCard title="Total Expense" amount={totalExpense} icon={<TrendingDown size={24} />} color="text-red-600" bgColor="bg-red-50" />
        <StatCard title="Net Balance" amount={balance} icon={<Wallet size={24} />} color="text-indigo-600" bgColor="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`rounded-2xl border p-5 shadow-sm transition-colors ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2 text-red-600"><TrendingDown size={20} /></div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Today’s Top 3 Expenses</h2>
              <p className={isDark ? "text-slate-400 text-sm" : "text-slate-500 text-sm"}>Largest spending categories</p>
            </div>
          </div>
          <div className="space-y-5">{renderChart(todayExpenses, "red")}</div>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm transition-colors ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600"><TrendingUp size={20} /></div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Today’s Top 3 Income</h2>
              <p className={isDark ? "text-slate-400 text-sm" : "text-slate-500 text-sm"}>Strongest earning sources</p>
            </div>
          </div>
          <div className="space-y-5">{renderChart(todayIncome, "green")}</div>
        </div>
      </div>

      <div className={`rounded-2xl border p-5 shadow-sm transition-colors ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600"><BarChart3 size={20} /></div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Financial Pulse</h3>
            <p className={isDark ? "text-slate-400 text-sm" : "text-slate-500 text-sm"}>Live snapshot of performance today</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`rounded-xl p-4 ${isDark ? "bg-slate-700/80" : "bg-slate-50"}`}>
            <div className="flex items-center gap-2 text-sm text-emerald-500"><Sparkles size={16} /> Income</div>
            <div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{todayIncome.reduce((sum, item) => sum + Number(item.amount || 0), 0).toLocaleString("en-IN")}</div>
          </div>
          <div className={`rounded-xl p-4 ${isDark ? "bg-slate-700/80" : "bg-slate-50"}`}>
            <div className="flex items-center gap-2 text-sm text-red-500"><TrendingDown size={16} /> Expenses</div>
            <div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{todayExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0).toLocaleString("en-IN")}</div>
          </div>
          <div className={`rounded-xl p-4 ${isDark ? "bg-slate-700/80" : "bg-slate-50"}`}>
            <div className="flex items-center gap-2 text-sm text-indigo-500"><Wallet size={16} /> Balance</div>
            <div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{(todayIncome.reduce((sum, item) => sum + Number(item.amount || 0), 0) - todayExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0)).toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
