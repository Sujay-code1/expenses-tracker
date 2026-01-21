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
      className={`h-screen bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col flex-shrink-0
      ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="hidden md:flex self-end mb-6 p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition m-4"
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
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all w-full whitespace-nowrap
              ${pathname === item.path 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-gray-700 hover:bg-indigo-50"}`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={()=>{
            navigate("/");
            window.innerWidth < 768 && toggleSidebar();
          }}
          className="flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all w-full text-red-600 hover:bg-red-50 whitespace-nowrap"
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
