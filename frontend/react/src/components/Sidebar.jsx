import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdAttachMoney,
  MdMoneyOff,
  MdAccountBalanceWallet,
  MdHistory  ,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <MdAttachMoney />, label: "Income", path: "/income" },
    { icon: <MdMoneyOff />, label: "Expense", path: "/expense" },
    { icon: <MdAccountBalanceWallet />, label: "Budget", path: "/budget" },
    { icon: <MdHistory />, label: "History", path: "/history" },
    { icon: <MdSettings />, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
  className={`h-screen p-4 flex flex-col bg-white shadow-[4px_0_20px_rgba(0,0,0,0.08)] transition-all duration-300
  ${isOpen ? "w-64" : "w-20"}`}
>
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="self-end mb-6 p-1 bg-indigo-600 text-white rounded-full shadow-md hover:scale-110 transition"
      >
        {isOpen ? <IoIosArrowBack size={22} /> : <IoIosArrowForward size={22} />}
      </button>

      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-3 rounded-lg text-[16px] font-medium transition-all w-full
              hover:bg-indigo-600 hover:text-white
              ${pathname === item.path ? "bg-indigo-600 text-white shadow-md" : ""}`}
          >
            <span className="text-[22px]">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t">
        <button
          onClick={()=>navigate("/")}
          className="flex items-center gap-4 p-3 rounded-lg text-[16px] font-medium transition-all w-full
            hover:bg-red-600 hover:text-white text-red-600"
        >
          <span className="text-[22px]">
            <MdLogout />
          </span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
