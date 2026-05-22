import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ExpenseDonutChart from "../components/charts/ExpenseDonutChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import { TrendingUp, TrendingDown, PiggyBank, Wallet } from "lucide-react";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [month, setMonth] = useState("current");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  if (user?.id) {
    fetchDashboard();
  }
}, [month, user]);

  useEffect(() => {
  console.log("Month changed:", month);
}, [month]);

const fetchDashboard = async () => {
  try {
    const res = await api.get(`/dashboard/${user.id}?month=${month}`);
    const response = res.data;

    setData(response);

    const formatted = response.categoryBreakdown
      ? Object.entries(response.categoryBreakdown).map(([key, value]) => ({
          name: key,
          value: value,
        }))
      : [];

    setExpenseData(formatted);

   const txRes = await api.get(`/transaction/${user.id}`);
setTransactions(txRes.data);
console.log("Transactions response:", txRes.data);


  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }
};


  if (!data) return <div className="p-10">Loading dashboard...</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>

          <div>
            <button
              onClick={() => setMonth("current")}
              className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Current
            </button>
            <button
              onClick={() => setMonth("last")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Last
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Income</p>
              <h2 className="text-2xl font-bold text-black">
                ₹{data.totalIncome}
              </h2>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Expense</p>
              <h2 className="text-2xl font-bold text-black">
                ₹{data.totalExpense}
              </h2>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm mb-1">Savings</p>
              <h2 className="text-2xl font-bold text-black">
                ₹{data.savings}
              </h2>
            </div>
            <PiggyBank className="text-blue-500" size={32} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm mb-1">Savings Rate</p>
              <h2 className="text-2xl font-bold text-black">
                {data.savingsRate.toFixed(1)}%
              </h2>
            </div>
            <Wallet className="text-purple-500" size={32} />
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpenseDonutChart data={expenseData} />

<MonthlyTrendChart monthlyTrend={data.monthlyTrend} />    
    </div>
<RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;