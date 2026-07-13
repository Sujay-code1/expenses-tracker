import { useSelector } from "react-redux";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../store/ThemeContext";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);
  const { isDark, toggleTheme } = useTheme();

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className={`sticky top-0 z-30 h-16 flex items-center justify-between px-6 ${
      isDark 
        ? "bg-gray-800/85 border-gray-700" 
        : "bg-[#fff]/85 border-white/[0.07]"
    } backdrop-blur-xl border-b transition-colors duration-300`}>

      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          title="Toggle Menu"
          className={`md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200 ${
            isDark
              ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
              : "bg-white/[0.06] border border-white/10 text-black hover:bg-white/10 hover:text-white"
          }`}
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-[#7C6FFF] to-[#A99EFF] flex items-center justify-center text-[17px] shrink-0">
            ₹
          </div>
          <span
            className={`font-extrabold text-[17px] tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ExpenseTracker
          </span>
        </div>
      </div>

      {/* Right: theme toggle + welcome + avatar */}
      <div className="flex items-center gap-3">
        
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200 ${
            isDark
              ? "bg-gray-700 border-gray-600 text-yellow-400 hover:bg-gray-600"
              : "bg-white/[0.06] border border-white/10 text-gray-700 hover:bg-white/10"
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Removed showing user's first name from header */}

        <div className={`hidden sm:block w-px h-5 ${
          isDark ? "bg-gray-700" : "bg-white/10"
        }`} />

        <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-semibold tracking-wide shrink-0 transition-colors duration-300 ${
          isDark
            ? "bg-gray-700 border-gray-600 text-purple-400"
            : "bg-[#7C6FFF]/25 border border-[#7C6FFF]/50 text-[#A99EFF]"
        }`}>
          {initials}
        </div>
      </div>

    </header>
  );
};

export default Header;