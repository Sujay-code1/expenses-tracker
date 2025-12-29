const ExpenseCard = ({ total }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Monthly Spending</p>
        <h3 className="text-3xl font-bold text-red-500 mt-1">
          ₹{Number(total).toLocaleString('en-IN')}
        </h3>
        <p className="text-xs text-gray-400 mt-2 italic">Based on selected month</p>
      </div>
    </div>
  );
};
export default ExpenseCard;