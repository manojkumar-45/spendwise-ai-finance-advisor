import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1E3A8A",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#3B82F6",
  "#EC4899",
];

export default function ExpenseDonutChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
        <p className="text-gray-500 text-sm">
          No expense data available for this period.
        </p>
      </div>
    );
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => {
                const percent = ((value / total) * 100).toFixed(1);
                return [`₹${value} (${percent}%)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}