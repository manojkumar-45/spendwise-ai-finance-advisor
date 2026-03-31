import { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarDays,
  Tag,
  FileText,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

const Transactions = () => {
  const { user } = useContext(AuthContext);

  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/transaction", {
        amount,
        category,
        date,
        type,
        notes,
        userId: user.id,
      });

      setSuccessMsg("Transaction added successfully 🎉");

      setAmount("");
      setCategory("");
      setDate("");
      setNotes("");

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to Add Transaction ❌");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Add a Transaction
            </h1>
            <p className="text-gray-500 mt-1 text-md">
              Track your income & expenses with clarity ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  max-w-[90%] mx-auto">

            {/* ================= LEFT FORM ================= */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              {successMsg && (
                <div className="mb-6 flex items-center gap-2 p-4 rounded-2xl bg-green-50 text-green-700 font-medium">
                  <CheckCircle2 size={20} />
                  {successMsg}
                </div>
              )}

              {/* Type Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setType("EXPENSE")}
                  className={`flex items-center justify-center gap-1 py-2 rounded-2xl font-semibold border transition-all ${
                    type === "EXPENSE"
                      ? "bg-red-50 border-red-400 text-red-600 shadow-md"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <ArrowDownCircle />
                  Expense
                </button>

                <button
                  type="button"
                  onClick={() => setType("INCOME")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-2xl font-semibold border transition-all ${
                    type === "INCOME"
                      ? "bg-green-50 border-green-400 text-green-600 shadow-md"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <ArrowUpCircle />
                  Income
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Amount */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Amount
                  </label>
                  <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-3xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <IndianRupee className="text-gray-400" size={18} />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full bg-transparent outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-3xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <Tag className="text-gray-400" size={18} />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-transparent outline-none"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Food">🍔 Food</option>
                      <option value="Rent">🏠 Rent</option>
                      <option value="Shopping">🛍 Shopping</option>
                      <option value="Transport">🚕 Transport</option>
                      <option value="Bills">💡 Bills</option>
                      <option value="Salary">💼 Salary</option>
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-3xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <CalendarDays className="text-gray-400" size={18} />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Notes (Optional)
                  </label>
                  <div className="mt-1 flex items-start gap-2 border border-gray-300 rounded-3xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <FileText className="text-gray-400 mt-1" size={18} />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write something..."
                      rows="3"
                      className="w-full bg-transparent outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition shadow-lg"
                >
                  ➕ Add Transaction
                </button>

              </form>
            </div>

            {/* ================= RIGHT PREVIEW ================= */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl p-10 flex flex-col justify-between">

              <div>
                <h2 className="text-2xl font-bold mb-3">
                  Transaction Preview
                </h2>

                <div className="mt-10 space-y-5">
                  <PreviewRow label="Type" value={type} />
                  <PreviewRow label="Amount" value={amount || "—"} />
                  <PreviewRow label="Category" value={category || "—"} />
                  <PreviewRow label="Date" value={date || "—"} />
                  <PreviewRow label="Notes" value={notes || "—"} />
                </div>
              </div>

              <p className="text-sm text-indigo-200 mt-10">
                Smart tracking builds smarter savings 💰
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PreviewRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span className="text-indigo-200">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default Transactions;