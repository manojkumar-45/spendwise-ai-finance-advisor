
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (res.data === "User registered successfully") {
        navigate("/login");
      } else {
        setError(res.data);
      }
    } catch (err) {
      setError("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE FORM */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          
          <h2 className="text-3xl font-bold mb-4 text-center">Create an account</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <div className="flex items-center border border-gray-400 rounded-full px-4 mt-1 bg-gray-50">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="flex items-center border border-gray-400  rounded-full px-4 mt-1 bg-gray-50">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
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
              <div className="flex items-center border border-gray-400  rounded-full px-4 mt-1 bg-gray-50">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
                <Eye size={18} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-400  rounded-full px-4 mt-1 bg-gray-50">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 mt-2 rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE INFO */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white px-16 py-8 flex-col ">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h1 className="text-2xl font-semibold">SpendWise AI</h1>
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Take Control of Your <br />
          Financial Future
        </h1>

        <p className="text-blue-200 text-lg mb-10">
          Join now to make smarter financial
          decisions with AI-powered insights.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold">AI Powered</h3>
            <p className="text-blue-200 text-sm">To analyze data</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold">Expense Tracking</h3>
            <p className="text-blue-200 text-sm">Saved Monthly</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold">Virtualization</h3>
            <p className="text-blue-200 text-sm">with charts</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold">Modern UI</h3>
            <p className="text-blue-200 text-sm">Interactive User Interfaces</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;