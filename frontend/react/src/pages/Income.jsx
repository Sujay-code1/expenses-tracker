import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios.js"; 
import { setIncome, setLoading, setError } from "../store/incomeSlice";

import IncomeForm from "../components/IncomeForm";
import IncomeTable from "../components/IncomeTable";
import IncomeFilter from "../components/IncomeFilter";
import TotalIncomeCard from "../components/TotalIncomeCard";

const Income = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.income);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const loadIncome = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await api.get(`/api/income?month=${month}`)
      dispatch(setIncome(res.data));
      setCurrentPage(1);
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Failed to load income"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [month, dispatch]);

  useEffect(() => {
    loadIncome();
  }, [loadIncome]);

  const filtered = list.filter(i =>
    filter === "all" ? true : i.frequency === filter
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Income Sources</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your income streams</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input 
            type="month" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
          <IncomeForm />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <TotalIncomeCard incomes={filtered} />

      <IncomeFilter filter={filter} setFilter={setFilter} />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <IncomeTable 
          incomes={filtered} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Income;
