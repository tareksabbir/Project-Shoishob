/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import icon from "../assets/icons/Untitled design (2).png";

// Import Lucide React icons to replace boxicons
import {
  Home,
  Hexagon,
  Plus,
  Users,
  Shield,
  Bookmark,
  Trophy,
  CreditCard,
  User,
  BadgeCheck,
  Calendar,
  UserPlus,
  MessageCircle,
  Briefcase,
  MessageSquare,
  Tag,
  Mail,
  Menu,
  LogOut
} from "lucide-react";

const DashBoardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Axios configuration with auth token
  const axiosConfig = {
    headers: {
      authorization: `bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const { data: isAdmin } = useQuery(["isAdmin", user?.email], async () => {
    const response = await axios.get(
      `${backendUrl}/api/v1/user/${user?.email}`,
      axiosConfig
    );
    return response.data.isAdmin;
  });

  const { data: isSuperAdmin } = useQuery(
    ["isSuperAdmin", user?.email],
    async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/admin/${user?.email}`,
        axiosConfig
      );
      return response.data.isSuperAdmin;
    }
  );

  const from = location.state?.from?.pathname || "/";
  
  const handleLogout = () => {
    logOut()
      .then(() => {
        Navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  // Check if menu item is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Icon mapping for Lucide icons
  const iconMap = {
    home: Home,
    hive: Hexagon,
    component: Plus,
    'user-circle': User,
    'shield-quarter': Shield,
    bookmark: Bookmark,
    trophy: Trophy,
    'purchase-tag': CreditCard,
    'badge-check': BadgeCheck,
    'calendar-event': Calendar,
    'add-to-queue': UserPlus,
    user: User,
    comment: MessageCircle,
    briefcase: Briefcase,
    'message-square-edit': MessageSquare,
    label: Tag,
    'mail-send': Mail,
    menu: Menu,
    'log-out': LogOut,
  };

  // Menu items configuration with colors and gradients
  const superAdminMenuItems = [
    { to: "/dashboard/adminHome", icon: "home", label: "Dashboard", gradient: "from-blue-500 to-cyan-500" },
    { to: "/dashboard/allTurfs", icon: "hive", label: "All Turf", gradient: "from-green-500 to-emerald-500" },
    { to: "/dashboard/addTurf", icon: "component", label: "Add Turf", gradient: "from-purple-500 to-violet-500" },
    { to: "/dashboard/allUsers", icon: "user-circle", label: "All User", gradient: "from-orange-500 to-amber-500" },
    { to: "/dashboard/allAdmin", icon: "shield-quarter", label: "All Admin", gradient: "from-red-500 to-rose-500" },
    { to: "/dashboard/allBookings", icon: "bookmark", label: "All Booking", gradient: "from-indigo-500 to-blue-500" },
    {to: "/dashboard/leaderboard", icon: "trophy", label: "Leader Board", gradient: "from-yellow-500 to-orange-500" },
    { icon: "purchase-tag", label: "Payment", gradient: "from-pink-500 to-rose-500" },
  ];

  const adminMenuItems = [
    { to: "/dashboard/ownerHome", icon: "home", label: "Dashboard", gradient: "from-blue-500 to-cyan-500" },
    { to: "/dashboard/myProfile", icon: "user-circle", label: "My Profile", gradient: "from-purple-500 to-violet-500" },
    { icon: "badge-check", label: "Turf Profile", gradient: "from-green-500 to-emerald-500" },
    { to: "/dashboard/ownerbookings", icon: "calendar-event", label: "All Booking", gradient: "from-indigo-500 to-blue-500" },
    { to: "/dashboard/addTournament", icon: "add-to-queue", label: "Registration", gradient: "from-orange-500 to-amber-500" },
    { icon: "trophy", label: "Leader Board", gradient: "from-yellow-500 to-orange-500" },
    { icon: "purchase-tag", label: "Pay History", gradient: "from-pink-500 to-rose-500" },
  ];

  const userMenuItems = [
    { to: "/dashboard/myProfile", icon: "user", label: "My Profile", gradient: "from-purple-500 to-violet-500" },
    { to: "/dashboard/usermybookings", icon: "bookmark", label: "My Booking", gradient: "from-indigo-500 to-blue-500" },
    { to: "/dashboard/leaderBoard", icon: "trophy", label: "Leader Board", gradient: "from-yellow-500 to-orange-500" },
    { icon: "comment", label: "Give Review", gradient: "from-green-500 to-emerald-500" },
    { to: "/dashboard/history", icon: "purchase-tag", label: "Pay History", gradient: "from-pink-500 to-rose-500" },
  ];

  const commonMenuItems = [
    { to: "/", icon: "home", label: "Home", gradient: "from-blue-500 to-cyan-500" },
    { to: "/booking", icon: "briefcase", label: "Booking", gradient: "from-indigo-500 to-purple-500" },
    { to: "/review", icon: "message-square-edit", label: "Review", gradient: "from-green-500 to-teal-500" },
    { to: "/about", icon: "label", label: "About", gradient: "from-orange-500 to-red-500" },
    { to: "/contact", icon: "mail-send", label: "Contact", gradient: "from-pink-500 to-rose-500" },
  ];

  const getMenuItems = () => {
    if (isSuperAdmin) return superAdminMenuItems;
    if (isAdmin) return adminMenuItems;
    return userMenuItems;
  };

  const getUserRole = () => {
    if (isSuperAdmin) return { role: "Super Admin", badge: "from-red-500 to-pink-500" };
    if (isAdmin) return { role: "Admin", badge: "from-blue-500 to-purple-500" };
    return { role: "User", badge: "from-green-500 to-teal-500" };
  };

  const renderMenuItem = ({ to, icon, label, gradient }) => {
    const isActive = to && isActiveRoute(to);
    const IconComponent = iconMap[icon] || Home;
    
    return (
      <li key={label} className="mb-2">
        {to ? (
          <Link
            to={to}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
              ${isActive 
                ? `bg-gradient-to-r ${gradient} text-white shadow-lg transform scale-105` 
                : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
              }
            `}
          >
            {/* Active indicator */}
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
            )}
            
            {/* Icon with gradient background for active items */}
            <div className={`
              relative p-2 rounded-lg transition-all duration-300
              ${isActive 
                ? 'bg-white/20 backdrop-blur-sm' 
                : `group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-white`
              }
            `}>
              <IconComponent 
                size={20}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
            </div>
            
            <span className="font-medium flex-1">{label}</span>
            
            {/* Active pulse effect */}
            {isActive && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </Link>
        ) : (
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 text-gray-400 transition-all duration-300 hover:text-white hover:bg-slate-800/50 rounded-xl group relative overflow-hidden"
          >
            <div className={`
              relative p-2 rounded-lg transition-all duration-300
              group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-white
            `}>
              <IconComponent 
                size={20}
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
              />
            </div>
            <span className="font-medium flex-1">{label}</span>
          </a>
        )}
      </li>
    );
  };

  const userRoleInfo = getUserRole();

  return (
    <main className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="drawer lg:drawer-open relative z-10">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        
        {/* Main content area */}
        <div className="drawer-content flex flex-col">
          {/* Mobile menu button */}
          <div className="navbar bg-slate-900/80 backdrop-blur-md lg:hidden border-b border-slate-700/50 shadow-lg">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost text-white hover:bg-white/10"
              >
                <Menu size={24} className="text-white" />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={icon} alt="Shoishob" className="h-8 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Shoishob
                </span>
              </div>
            </div>
            {/* Mobile user badge */}
            <div className="flex-none">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${userRoleInfo.badge}`}>
                {userRoleInfo.role}
              </div>
            </div>
          </div>
          
          {/* Page content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          
          <aside className="min-h-full w-80 bg-slate-950/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl">
            {/* Logo and User Info */}
            <div className="p-6 border-b border-slate-700/50">
              <Link
                to="/"
                className="flex items-center gap-4 mb-6 group"
              >
                <div className="relative">
                  <img src={icon} alt="Shoishob" className="h-12 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  Shoishob
                </span>
              </Link>
              
              {/* User Profile Card */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4 rounded-xl backdrop-blur-sm border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm truncate">
                      {user?.displayName || user?.email || 'User'}
                    </p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${userRoleInfo.badge} mt-1`}>
                      {userRoleInfo.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation menu */}
            <nav className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {/* Role-specific menu items */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4 flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  Dashboard
                </h3>
                <ul className="space-y-2">
                  {getMenuItems().map(renderMenuItem)}
                </ul>
              </div>

              {/* Common menu items */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4 flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                  General
                </h3>
                <ul className="space-y-2">
                  {commonMenuItems.map(renderMenuItem)}
                </ul>
              </div>

              {/* Logout button */}
              <div className="pt-6 border-t border-slate-700/50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl group relative overflow-hidden border border-transparent hover:border-red-500/30"
                >
                  <div className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-red-500/20">
                    <LogOut size={20} className="text-red-500" />
                  </div>
                  <span className="font-medium flex-1 text-left">Logout</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DashBoardLayout;