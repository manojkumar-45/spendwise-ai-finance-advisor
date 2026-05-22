import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Shield, Sparkles, TrendingUp, Eye } from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", loginData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-16 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h1 className="text-3xl font-semibold">SpendWise AI</h1>
        </div>

        {/* Main Content */}
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Smart Money Management <br />
            with AI Insights
          </h2>

          <p className="text-blue-200 text-lg mb-14">
            Track expenses, analyze spending patterns, and get personalized
            financial advice powered by AI.
          </p>

          <div className="space-y-5  text-blue-100">
            <div className="flex items-center gap-3 text-lg">
              <Shield size={28} />
              <span>Secure & Private</span>
            </div>

            <div className="flex items-center gap-3 text-lg">
              <Sparkles size={28} />
              <span>AI-Powered Insights</span>
            </div>

            <div className="flex items-center gap-3 text-lg">
              <TrendingUp size={28} />
              <span>Smart Analytics</span>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-[63%]">
          <h2 className="text-3xl font-bold mb-1 text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center border border-gray-400 rounded-full px-4 mt-1 bg-gray-50">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center border border-gray-400 rounded-full px-4 mt-1 bg-gray-50">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
                <Eye size={18} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 mt-2 rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
