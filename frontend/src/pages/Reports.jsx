import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await api.get(`/dashboard/${user.id}?month=current`);
    setData(res.data);
  };

  if (!data)
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-10 text-xl font-semibold">
          Loading Reports...
        </div>
      </div>
    );

  const pieData = Object.entries(data.categoryBreakdown).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  const lineData = data.monthlyTrend.map((m) => ({
    name: m.month,
    income: m.income,
    expense: m.expense,
  }));

  const COLORS = [
    "#6366f1",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const totalIncome = data.monthlyTrend.reduce(
    (acc, curr) => acc + curr.income,
    0
  );
  const totalExpense = data.monthlyTrend.reduce(
    (acc, curr) => acc + curr.expense,
    0
  );
  const savings = totalIncome - totalExpense;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full p-8">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Financial Reports
          </h1>
          <p className="text-gray-500 mt-2">
            Track your spending insights and income trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Income</h3>                
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 mt-4">
              ₹ {totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Expense</h3>
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 mt-4">
              ₹ {totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Net Savings</h3>
              <CurrencyRupeeIcon className="h-6 w-6 text-blue-500" />
            </div>
            <p
              className={`text-2xl font-bold mt-4 ${
                savings >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              ₹ {savings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <h2 className="mb-6 font-semibold text-lg text-gray-700">
              Expense Breakdown by Category
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <h2 className="mb-6 font-semibold text-lg text-gray-700">
              Income vs Expense Trend
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Reports;

