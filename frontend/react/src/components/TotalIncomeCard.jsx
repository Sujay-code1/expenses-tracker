const TotalIncomeCard = ({ incomes }) => {
  const total = incomes.reduce((sum,i)=>sum+Number(i.amount),0);

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h4 className="text-gray-500">Total Income</h4>
      <p className="text-3xl font-bold text-green-600">₹ {total}</p>
    </div>
  );
};

export default TotalIncomeCard;
