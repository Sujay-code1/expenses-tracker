import { useSelector } from "react-redux";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <header className="bg-white shadow px-4 sm:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="sm:hidden text-xl text-gray-800"
        >
          ☰
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          ExpenseTracker
        </h1>
      </div>

      <span className="hidden sm:block text-gray-700 font-medium">
        {user?.fullName || "User"}
      </span>
    </header>
  );
};

export default Header;
