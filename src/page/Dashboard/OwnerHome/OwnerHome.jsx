/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useQuery } from "react-query";
import { useContext } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Area,
  AreaChart,
  Tooltip,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  CreditCard,
  AlertCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Star,
  Clock,
  BarChart3,
  PieChart as PieChartLucide
} from "lucide-react";
import { AuthContext } from "../../../Context/AuthProvider";

const OwnerHome = () => {
  const { user, loading } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
  const { data: owner, isLoading: ownerLoading } = useQuery(
    ["owner", user?.email], 
    async () => {
      if (!user?.email) return null;
      
      const res = await axios.get(
        `${API_URL}/api/v1/user/email/${user?.email}`
      );
      return res.data.data;
    },
    {
      enabled: !!user?.email,
    }
  );

  const { data: adminStat, isLoading: statsLoading } = useQuery(
    ["adminStat", owner?._id],
    async () => {
      if (!owner?._id) return null;
      
      const res = await axios.get(
        `${API_URL}/api/v1/ownerStats/owner-collection-counts/${owner?._id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return res.data.data;
    },
    {
      enabled: !!owner?._id,
    }
  );

  // Mock data for enhanced dashboard features
  const mockData = {
    monthlyRevenue: [
      { month: 'Jan', revenue: 25000, bookings: 65 },
      { month: 'Feb', revenue: 32000, bookings: 78 },
      { month: 'Mar', revenue: 28000, bookings: 70 },
      { month: 'Apr', revenue: 41000, bookings: 95 },
      { month: 'May', revenue: 35000, bookings: 85 },
      { month: 'Jun', revenue: 47000, bookings: 112 }
    ],
    weeklyBookings: [
      { day: 'Mon', bookings: 12, revenue: 4200 },
      { day: 'Tue', bookings: 18, revenue: 6300 },
      { day: 'Wed', bookings: 15, revenue: 5250 },
      { day: 'Thu', bookings: 22, revenue: 7700 },
      { day: 'Fri', bookings: 28, revenue: 9800 },
      { day: 'Sat', bookings: 35, revenue: 12250 },
      { day: 'Sun', bookings: 30, revenue: 10500 }
    ],
    turfUtilization: [
      { name: 'Football', value: 45, color: '#3B82F6' },
      { name: 'Cricket', value: 30, color: '#10B981' },
      { name: 'Basketball', value: 15, color: '#F59E0B' },
      { name: 'Others', value: 10, color: '#EF4444' }
    ],
    recentBookings: [
      { id: 1, customer: 'John Doe', turf: 'Football Field A', time: '2 hours ago', amount: 1500, status: 'confirmed' },
      { id: 2, customer: 'Jane Smith', turf: 'Cricket Ground', time: '4 hours ago', amount: 2000, status: 'pending' },
      { id: 3, customer: 'Mike Johnson', turf: 'Basketball Court', time: '6 hours ago', amount: 800, status: 'confirmed' },
      { id: 4, customer: 'Sarah Wilson', turf: 'Football Field B', time: '8 hours ago', amount: 1200, status: 'cancelled' },
      { id: 5, customer: 'Tom Brown', turf: 'Multi-purpose', time: '1 day ago', amount: 1800, status: 'confirmed' }
    ]
  };

  if (loading || ownerLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: `BDT ${adminStat?.totalIncome?.toLocaleString() || 0}`,
      icon: DollarSign,
      change: "+18.2%",
      trend: "up",
      bgGradient: "from-green-500 to-emerald-600",
      description: "This month"
    },
    {
      title: "Total Customers",
      value: adminStat?.usersCount?.toLocaleString() || 0,
      icon: Users,
      change: "+12.5%",
      trend: "up",
      bgGradient: "from-blue-500 to-cyan-600",
      description: "Active customers"
    },
    {
      title: "Unique Customers",
      value: adminStat?.uniqueUsers?.toLocaleString() || 0,
      icon: Star,
      change: "+8.7%",
      trend: "up",
      bgGradient: "from-purple-500 to-indigo-600",
      description: "Regular customers"
    },
    {
      title: "Total Bookings",
      value: adminStat?.allBookingsCount?.toLocaleString() || 0,
      icon: Calendar,
      change: "+22.1%",
      trend: "up",
      bgGradient: "from-orange-500 to-red-600",
      description: "All time"
    },
    {
      title: "Paid Bookings",
      value: adminStat?.paidBookingCount?.toLocaleString() || 0,
      icon: CreditCard,
      change: "+15.3%",
      trend: "up",
      bgGradient: "from-teal-500 to-green-600",
      description: "Completed payments"
    },
    {
      title: "Pending Payments",
      value: adminStat?.UnPaidBookingCount?.toLocaleString() || 0,
      icon: Clock,
      change: "-8.4%",
      trend: "down",
      bgGradient: "from-yellow-500 to-orange-600",
      description: "Awaiting payment"
    }
  ];

  const bookingStatusData = [
    { name: "Total Bookings", value: adminStat?.allBookingsCount || 0, color: "#3B82F6" },
    { name: "Paid", value: adminStat?.paidBookingCount || 0, color: "#10B981" },
    { name: "Unpaid", value: adminStat?.UnPaidBookingCount || 0, color: "#F59E0B" }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl">
          <p className="text-gray-300 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-gray-300">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Owner Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {owner?.name || 'Owner'}! Here's how your turfs are performing.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-700 rounded-lg px-4 py-2 border border-gray-600">
              <span className="text-gray-300 text-sm">Last updated: Just now</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.bgGradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Monthly Revenue Trend */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-blue-400" />
              Monthly Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={mockData.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Turf Utilization */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <PieChartLucide className="h-6 w-6 mr-3 text-green-400" />
              Turf Utilization
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={mockData.turfUtilization}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockData.turfUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Booking Status */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-purple-400" />
              Booking Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Performance */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-orange-400" />
              Weekly Bookings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-cyan-400" />
              Recent Bookings
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {mockData.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{booking.customer}</p>
                    <p className="text-gray-400 text-xs mt-1">{booking.turf} • {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">BDT {booking.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-900 text-green-300' :
                      booking.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Activity className="h-6 w-6 mr-3 text-blue-400" />
            Business Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">94.2%</div>
              <div className="text-gray-400 text-sm font-medium">Booking Success Rate</div>
              <div className="text-gray-500 text-xs mt-1">Last 30 days</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">4.6</div>
              <div className="text-gray-400 text-sm font-medium">Average Rating</div>
              <div className="text-gray-500 text-xs mt-1">Customer reviews</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">76%</div>
              <div className="text-gray-400 text-sm font-medium">Turf Utilization</div>
              <div className="text-gray-500 text-xs mt-1">Peak hours</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-orange-400 mb-2">BDT 1,247</div>
              <div className="text-gray-400 text-sm font-medium">Avg. Booking Value</div>
              <div className="text-gray-500 text-xs mt-1">Per transaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;