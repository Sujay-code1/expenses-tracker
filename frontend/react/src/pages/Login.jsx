import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import api from "../utils/axios.js"; 

const Login = () => {
  console.log("API URL:", import.meta.env.VITE_API_URL)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const[showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await api.post("/api/auth/login", formData);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      } else {
        localStorage.removeItem("token");
      }

      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      localStorage.removeItem("token");
      dispatch(setError(err.response?.data?.message || "Login failed"));
      console.error("Login Error:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"

           
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required 

          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          type="button"
          onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ?  <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
          </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
