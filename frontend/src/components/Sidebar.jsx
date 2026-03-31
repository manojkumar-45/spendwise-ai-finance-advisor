
import { Link, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";


import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: PlusCircle },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "AI Advisor", path: "/ai", icon: Bot },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col fixed">
      
      {/* <div className="p-6 text-2xl font-bold flex items-center gap-2">
        📈 SpendWise
      </div> */}

      <div className="p-6 text-2xl font-bold flex items-center gap-2">
  <Wallet className="text-grey-500" />
  SpendWise
</div>

      <div className="flex-1 px-4 space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-800 shadow-lg"
                  : "hover:bg-blue-800/50 text-gray-200"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-5 border-t border-white/20 flex items-center gap-3">

  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white">
    {user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"}
  </div>

  <div className="text-md">
    <p className="font-semibold text-white">
      {user?.fullName || "User"}
    </p>
    <p className="text-gray-300 text-sm">
      {user?.email || "user@example.com"}
    </p>
  </div>

</div>
    </div>
  );
};

export default Sidebar;