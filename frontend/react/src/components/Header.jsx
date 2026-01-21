import { useSelector } from "react-redux";

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

        <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          💰 ExpenseTracker
        </h1>
      </div>

      <span className="hidden sm:block text-gray-700 font-medium text-sm sm:text-base">
        Welcome, {user?.fullName || "User"}!
      </span>
    </header>
  );
};

export default Header;
