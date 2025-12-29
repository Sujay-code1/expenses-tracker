const BudgetCard = ({ total, spent }) => {
  const progress = total > 0 ? (spent / total) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Monthly Budget</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{total.toLocaleString('en-IN')}</h3>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Spent</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">₹{spent.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      {/* Subtle Progress Bar added for context */}
      <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${progress > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetCard;