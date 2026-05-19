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
import { useTheme } from "../store/ThemeContext";

function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDark } = useTheme();

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
      className={`h-screen shadow-lg transition-all duration-300 flex flex-col flex-shrink-0 ${
        isDark
          ? "bg-gray-800 border-r border-gray-700"
          : "bg-blue-700 border-r border-blue-800"
      } ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className={`hidden md:flex self-end mb-6 p-2 rounded-lg shadow-md transition m-4 ${
          isDark
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {isOpen ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
      </button>

      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1 px-4">
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              navigate(item.path);
              window.innerWidth < 768 && toggleSidebar();
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all w-full whitespace-nowrap ${
              pathname === item.path 
                ? isDark
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-indigo-600 text-white shadow-md"
                : isDark
                ? "text-gray-200 hover:bg-gray-700"
                : "text-white hover:bg-blue-600"
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t transition-colors duration-300 ${
        isDark ? "border-gray-700" : "border-blue-800"
      }`}>
        <button
          onClick={()=>{
            navigate("/");
            window.innerWidth < 768 && toggleSidebar();
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all w-full whitespace-nowrap ${
            isDark
              ? "text-red-400 hover:bg-red-600/20"
              : "text-white hover:bg-red-600/20"
          }`}
        >
          <span className="text-xl flex-shrink-0">
            <MdLogout />
          </span>
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
