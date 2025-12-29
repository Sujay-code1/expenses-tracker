const IncomeFilter = ({ filter, setFilter }) => (
  <div className="flex gap-3">
    {["all","monthly","weekly","one-time","yearly"].map(f => (
      <button key={f}
        onClick={()=>setFilter(f)}
        className={`px-4 py-2 rounded ${filter===f?"bg-indigo-600 text-white":"bg-white shadow"}`}>
        {f}
      </button>
    ))}
  </div>
);

export default IncomeFilter;
