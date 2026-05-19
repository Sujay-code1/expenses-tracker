import React from "react";
import { useTheme } from "../store/ThemeContext";

const StatCard = ({ title, amount, icon, color, bgColor }) => {
  const { isDark } = useTheme();

  return (
    <div className={`p-6 rounded-2xl shadow-sm flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] ${
      isDark
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-gray-100"
    } border`}>
      {/* Icon Container */}
      <div className={`p-4 rounded-xl ${bgColor} ${color}`}>
        {icon}
      </div>
      
      {/* Text Content */}
      <div>
        <p className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
          {title}
        </p>
        <h3 className={`text-2xl font-bold mt-1 transition-colors duration-300 ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          ₹{amount.toLocaleString("en-IN")}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;