import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={open}
        toggleSidebar={() => setOpen(!open)}
      />

      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setOpen(!open)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
