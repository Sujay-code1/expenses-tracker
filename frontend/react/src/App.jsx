import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense"
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";

function App() {
  return (
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
  );
}

export default App;
