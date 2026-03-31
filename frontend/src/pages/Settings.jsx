import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail,MailCheck , Calendar, ShieldCheck, LogOut, Wallet } from "lucide-react";
import api from "../services/api";

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [month, setMonth] = useState("current");

  const fetchDashboard = async () => {
    const res = await api.get(`/dashboard/${user.id}?month=${month}`);
    const response = res.data;

    setDetails(response);
  };

  useEffect(() => {
    if (user?.id) {
      fetchDashboard();
    }
  }, [user, month]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleInterestClick = (interest) => {
    alert(`${interest} added`);
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "2026";

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-2">
            Manage your profile and financial preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* Profile Card */}
            <div className="relative bg-white rounded-3xl p-5 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

              <div className="flex items-center mt-2 gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {user?.fullName?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-500 text-sm">SpendWise Member</p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6 bg-gray-50 rounded-xl p-1 text-sm text-gray-600 leading-relaxed">
                Passionate about managing finances smartly. Focused on saving
                more, investing wisely, and building long-term wealth.
              </div>
            </div>

            {/* Income Card */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-7 text-white shadow-xl overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

              <div className="flex items-center gap-3 mb-4">
                <Wallet size={20} />
                <span className="text-sm opacity-90">Monthly Income</span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight">
                ₹ {details?.totalIncome || "0"}
              </h2>

              <p className="text-sm opacity-80 mt-2">
                Used for savings & analytics calculations
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Account Details
              </h3>

              <div className="grid sm:grid-cols-3 ml-14 gap-6 text-sm max-w-[90%] mx-auto">
                <div className="flex items-center gap-4">
                  <MailCheck  className="text-blue-600 mt-0" size={24} />
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ShieldCheck className="text-green-600 " size={24} />
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="text-purple-600 " size={24} />
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium text-gray-800">{joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Financial Interests
              </h3>

              <div className="flex flex-wrap gap-4">
                <div
                  onClick={() => handleInterestClick("Investing")}
                  className="px-5 py-3 bg-blue-50 text-blue-700 rounded-2xl font-medium shadow-sm hover:scale-105 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  📈 Investing
                </div>

                <div
                  onClick={() => handleInterestClick("Saving Goals")}
                  className="px-5 py-3 bg-green-50 text-green-700 rounded-2xl font-medium shadow-sm hover:scale-105 hover:bg-green-600 hover:text-white transition cursor-pointer"
                >
                  💰 Saving Goals
                </div>

                <div
                  onClick={() => handleInterestClick("Budget Planning")}
                  className="px-5 py-3 bg-purple-50 text-purple-700 rounded-2xl font-medium shadow-sm hover:scale-105 hover:bg-purple-600 hover:text-white transition cursor-pointer"
                >
                  📊 Budget Planning
                </div>

                <div
                  onClick={() => handleInterestClick("Wealth Growth")}
                  className="px-5 py-3 bg-orange-50 text-orange-700 rounded-2xl font-medium shadow-sm hover:scale-105 hover:bg-orange-600 hover:text-white transition cursor-pointer"
                >
                  🚀 Wealth Growth
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="ml-12">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
              >
                <LogOut size={22} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
