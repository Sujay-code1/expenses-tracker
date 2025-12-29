import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIncome, setLoading, setError } from "../store/incomeSlice";

import IncomeForm from "../components/IncomeForm";
import IncomeTable from "../components/IncomeTable";
import IncomeFilter from "../components/IncomeFilter";
import TotalIncomeCard from "../components/TotalIncomeCard";

const Income = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.income);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadIncome = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("http://localhost:5000/api/income", {
          withCredentials: true,
        });
        dispatch(setIncome(res.data));
      } catch (err) {
        dispatch(setError(err.response?.data?.message || "Failed to load income"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadIncome();
  }, [dispatch]);

  const filtered = list.filter(i =>
    filter === "all" ? true : i.frequency === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold">Income Sources</h2>
        <IncomeForm />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <TotalIncomeCard incomes={filtered} />

      <IncomeFilter filter={filter} setFilter={setFilter} />

      {isLoading ? (
        <p className="text-center py-6">Loading...</p>
      ) : (
        <IncomeTable incomes={filtered} />
      )}
    </div>
  );
};

export default Income;
