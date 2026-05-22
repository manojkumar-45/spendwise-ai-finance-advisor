import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <span className="text-sm text-gray-500">
          Last 5 transactions
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-2">
          {transactions
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "EXPENSE"
                        ? "bg-red-100"
                        : "bg-green-100"
                    }`}
                  >
                    {tx.type === "EXPENSE" ? (
                      <ArrowDownCircle
                        className="text-red-500"
                        size={22}
                      />
                    ) : (
                      <ArrowUpCircle
                        className="text-green-600"
                        size={22}
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {tx.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      {tx.notes || "No notes"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      tx.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {tx.type === "EXPENSE" ? "-" : "+"}₹{tx.amount}
                  </p>
                  <p className="text-xs text-gray-400">
                    {tx.date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}