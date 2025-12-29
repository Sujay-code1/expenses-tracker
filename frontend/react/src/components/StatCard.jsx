import React from "react";

const StatCard = ({ title, amount, icon, color, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
      {/* Icon Container */}
      <div className={`p-4 rounded-xl ${bgColor} ${color}`}>
        {icon}
      </div>
      
      {/* Text Content */}
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">
          ₹{amount.toLocaleString("en-IN")}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;