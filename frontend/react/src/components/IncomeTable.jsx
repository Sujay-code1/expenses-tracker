import { useDispatch } from "react-redux";
import { removeIncome } from "../store/incomeSlice";
import { Trash2 } from "lucide-react";
import axios from "axios";

const IncomeTable = ({ incomes }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/income/${id}`, {
          withCredentials: true,
        });
        dispatch(removeIncome(id));
      } catch (err) {
        console.error("Delete Error:", err);
        alert(err.response?.data?.message || "Failed to delete income");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <table className="w-full border-collapse">
        <thead className="bg-indigo-50">
          <tr className="text-sm text-gray-700">
            <th className="px-6 py-4 text-left font-semibold">Source</th>
            <th className="px-6 py-4 text-left font-semibold">Date</th>
            <th className="px-6 py-4 text-center font-semibold">Amount</th>
            <th className="px-6 py-4 text-center font-semibold">Frequency</th>
            <th className="px-6 py-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {incomes.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-10 text-center text-gray-400">
                No income records found
              </td>
            </tr>
          ) : (
            incomes.map((i) => (
              <tr key={i._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-left font-medium text-gray-800">
                  {i.source}
                </td>

                {/* ADDED THE MISSING DATE CELL */}
                <td className="px-6 py-4 text-left text-gray-600 text-sm">
                  {new Date(i.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4 text-center text-green-600 font-bold">
                  ₹{Number(i.amount).toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium capitalize">
                    {i.frequency}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;