import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wallet } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Wallet size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            ExpenseTracker
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/login")}
            className="text-gray-600 font-semibold hover:text-indigo-600 transition"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto gap-12">
        {/* Left Side: Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1]">
            Take Control of Your <br />
            <span className="text-indigo-600">Financial Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl font-medium leading-relaxed">
            Track every rupee, set smart budgets, and watch your savings grow 
            with our simple yet powerful expense tracking dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => navigate("/signup")}
              className="group bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-gray-800 transition shadow-xl"
            >
              Get Started 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex -space-x-3 items-center ml-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
              ))}
              <p className="ml-4 text-sm text-gray-500 font-semibold">Joined by 10,000+ users</p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Placeholder */}
        <div className="flex-1 w-full hidden md:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100 rounded-[2rem] blur-2xl opacity-50" />
            <div className="relative bg-white border border-gray-100 p-4 rounded-[2rem] shadow-2xl">
              <img 
                src="https://img.freepik.com/free-vector/dashboard-interface-user-panel-template_52683-23323.jpg" 
                alt="Dashboard Preview" 
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-70">
            <Wallet size={20} />
            <span className="font-bold text-gray-800">ExpenseTracker</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">
            © 2025 ExpenseTracker Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400 font-semibold">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;