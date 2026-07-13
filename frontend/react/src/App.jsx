import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Income = lazy(() => import("./pages/Income"));
const Expense = lazy(() => import("./pages/Expense"));
const Budget = lazy(() => import("./pages/Budget"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const History = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Settings"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div></div>}>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        
      </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
