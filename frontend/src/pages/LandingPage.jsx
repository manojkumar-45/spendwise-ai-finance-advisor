import { Link } from "react-router-dom";
import { TrendingUp, Shield, Sparkles } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h1 className="text-2xl font-semibold">SpendWise AI</h1>
        </div>

        <div className="space-x-6 hidden md:flex">
          <Link
            to="/login"
            className="bg-white text-blue-800 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center text-center px-6 mt-20">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          Smart Money Management <br />
          <span className="text-blue-200">Powered by AI Insights</span>
        </h1>

        <p className="mt-6 text-lg text-blue-100 max-w-2xl">
          Track expenses, analyze spending patterns, and receive personalized
          financial advice to grow your savings smarter.
        </p>

        <div className="mt-10 flex gap-6">
          <Link
            to="/register"
            className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-100 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-10 mt-18 pb-20">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center hover:scale-105 transition">
          <Shield size={32} className="mx-auto mb-4 text-blue-200" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-blue-100">
            Your financial data is encrypted and securely stored.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center hover:scale-105 transition">
          <Sparkles size={32} className="mx-auto mb-4 text-blue-200" />
          <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
          <p className="text-blue-100">
            Get intelligent suggestions to optimize your spending.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center hover:scale-105 transition">
          <TrendingUp size={32} className="mx-auto mb-4 text-blue-200" />
          <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
          <p className="text-blue-100">
            Visualize your expenses with powerful dashboards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
