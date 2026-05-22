import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";

export default function MonthlyTrendChart({ monthlyTrend }) {
  
  const formattedData = monthlyTrend?.map((item) => ({
    ...item,
    month: new Date(item.month + "-01").toLocaleString("en-US", {
      month: "short",
    }),
  }));

  if (!formattedData || formattedData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Trend</h2>
        <p className="text-gray-500 text-sm">No trend data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-1">Monthly Trend</h2>
      <p className="text-sm text-gray-500 mb-4">
        Income vs Expense vs Savings (Last 6 Months)
      </p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            
            {/* 🔥 Gradients */}
            <defs>
              <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="savingsColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                fontSize: "13px",
              }}
              formatter={(value) => `₹${value}`}
              labelStyle={{ color: "#111827", fontWeight: "600" }}
            />

            {/* Legend */}
            <Legend iconType="circle" />

            {/* Income */}
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              fill="url(#incomeColor)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                stroke: "#10B981",
                strokeWidth: 2,
                fill: "#fff",
              }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />

            {/* Expense */}
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              fill="url(#expenseColor)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                stroke: "#EF4444",
                strokeWidth: 2,
                fill: "#fff",
              }}
              animationDuration={1400}
            />

            {/* Savings */}
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#3B82F6"
              fill="url(#savingsColor)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                stroke: "#3B82F6",
                strokeWidth: 2,
                fill: "#fff",
              }}
              animationDuration={1600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}