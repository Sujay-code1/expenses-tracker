import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-[#fff]/85 backdrop-blur-xl border-b border-white/[0.07]">

      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          title="Toggle Menu"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 text-black hover:bg-white/10 hover:text-white transition-colors duration-200"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-[#7C6FFF] to-[#A99EFF] flex items-center justify-center text-[17px] shrink-0">
            ₹
          </div>
          <span
            className="text-black font-extrabold text-[17px] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ExpenseTracker
          </span>
        </div>
      </div>

      {/* Right: welcome + avatar */}
      <div className="flex items-center gap-3">
        <p className="hidden sm:block text-[13px] text-white/40">
          Welcome back,{" "}
          <span className="text-black font-medium">
            {user?.fullName?.split(" ")[0] || "User"}
          </span>
        </p>

        <div className="hidden sm:block w-px h-5 bg-white/10" />

        <div className="w-[34px] h-[34px] rounded-full bg-[#7C6FFF]/25 border border-[#7C6FFF]/50 flex items-center justify-center text-xs font-semibold text-[#A99EFF] tracking-wide shrink-0">
          {initials}
        </div>
      </div>

    </header>
  );
};

export default Header;