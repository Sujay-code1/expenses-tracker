import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar - Hidden on mobile by default */}
      <div className={`fixed md:relative z-50 md:z-auto transition-transform duration-300 md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <Sidebar
          isOpen={open}
          toggleSidebar={() => setOpen(!open)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden">
        <Header onMenuClick={() => setOpen(!open)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full bg-gray-50">
          <div className="w-11/12 md:w-4/5 mx-auto py-6 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
