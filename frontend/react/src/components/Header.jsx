import { useSelector } from "react-redux";
import {  Wallet } from "lucide-react";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          title="Toggle Menu"
        >
          <span className="text-2xl">☰</span>
        </button>
        

         <div className="flex items-center  gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Wallet size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            ExpenseTracker
          </span>
        </div>
       
      </div>

      

      <span className="hidden sm:block text-gray-700 font-medium text-sm sm:text-base">
        Welcome, {user?.fullName || "User"}!
      </span>
    </header>
  );
};

export default Header;
