/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useQuery } from "react-query";
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
  RefreshCw
} from "lucide-react";

const AdminHome = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { data: adminStat, isLoading } = useQuery(["adminStat"], async () => {
    const response = await fetch(
      `${backendUrl}/api/v1/stats/collection-counts`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.data;
  });

  // Mock data for additional charts and enhanced UI
  const mockData = {
    monthlyRevenue: [
      { month: 'Jan', revenue: 45000, bookings: 120 },
      { month: 'Feb', revenue: 52000, bookings: 135 },
      { month: 'Mar', revenue: 48000, bookings: 128 },
      { month: 'Apr', revenue: 61000, bookings: 158 },
      { month: 'May', revenue: 55000, bookings: 145 },
      { month: 'Jun', revenue: 67000, bookings: 172 }
    ],
    turfUtilization: [
      { name: 'Football', value: 45, color: '#3B82F6' },
      { name: 'Cricket', value: 30, color: '#10B981' },
      { name: 'Basketball', value: 15, color: '#F59E0B' },
      { name: 'Tennis', value: 10, color: '#EF4444' }
    ],
    recentActivity: [
      { id: 1, action: 'New booking created', user: 'John Doe', time: '2 min ago', type: 'booking' },
      { id: 2, action: 'Payment received', user: 'Jane Smith', time: '5 min ago', type: 'payment' },
      { id: 3, action: 'New user registered', user: 'Mike Johnson', time: '10 min ago', type: 'user' },
      { id: 4, action: 'Turf maintenance scheduled', user: 'Admin', time: '15 min ago', type: 'maintenance' },
      { id: 5, action: 'Booking cancelled', user: 'Sarah Wilson', time: '20 min ago', type: 'cancellation' }
    ],
    weeklyStats: [
      { day: 'Mon', bookings: 25, revenue: 8500 },
      { day: 'Tue', bookings: 32, revenue: 10200 },
      { day: 'Wed', bookings: 28, revenue: 9100 },
      { day: 'Thu', bookings: 35, revenue: 11500 },
      { day: 'Fri', bookings: 42, revenue: 13800 },
      { day: 'Sat', bookings: 58, revenue: 18900 },
      { day: 'Sun', bookings: 48, revenue: 15600 }
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: `BDT ${adminStat?.paidSum?.toLocaleString() || 0}`,
      icon: DollarSign,
      change: "+12.5%",
      trend: "up",
      bgGradient: "from-green-500 to-emerald-600",
      description: "This month"
    },
    {
      title: "Total Users",
      value: adminStat?.usersCount?.toLocaleString() || 0,
      icon: Users,
      change: "+8.2%",
      trend: "up",
      bgGradient: "from-blue-500 to-cyan-600",
      description: "Active users"
    },
    {
      title: "Total Turfs",
      value: adminStat?.totalTurfCount || 0,
      icon: MapPin,
      change: "+3.1%",
      trend: "up",
      bgGradient: "from-purple-500 to-indigo-600",
      description: "Available turfs"
    },
    {
      title: "Total Bookings",
      value: adminStat?.bookingCount?.toLocaleString() || 0,
      icon: Calendar,
      change: "+15.3%",
      trend: "up",
      bgGradient: "from-orange-500 to-red-600",
      description: "All time"
    },
    {
      title: "Paid Bookings",
      value: adminStat?.totalPaidCount?.toLocaleString() || 0,
      icon: CreditCard,
      change: "+9.7%",
      trend: "up",
      bgGradient: "from-teal-500 to-green-600",
      description: "Completed"
    },
    {
      title: "Unpaid Bookings",
      value: adminStat?.totalUnPaidCount?.toLocaleString() || 0,
      icon: AlertCircle,
      change: "-5.2%",
      trend: "down",
      bgGradient: "from-red-500 to-pink-600",
      description: "Pending payment"
    }
  ];

  const chartData = [
    { name: "Total Bookings", value: adminStat?.bookingCount || 0, color: "#3B82F6" },
    { name: "Paid", value: adminStat?.totalPaidCount || 0, color: "#10B981" },
    { name: "Unpaid", value: adminStat?.totalUnPaidCount || 0, color: "#EF4444" }
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
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your turf business.</p>
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
          {/* Monthly Revenue Chart */}
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

          {/* Turf Utilization Pie Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-green-400" />
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
          {/* Booking Status Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-purple-400" />
              Booking Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Performance Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-orange-400" />
              Weekly Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.weeklyStats}>
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

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-cyan-400" />
              Recent Activity
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'booking' ? 'bg-blue-400' :
                    activity.type === 'payment' ? 'bg-green-400' :
                    activity.type === 'user' ? 'bg-purple-400' :
                    activity.type === 'cancellation' ? 'bg-red-400' :
                    'bg-orange-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.user} • {activity.time}</p>
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
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">98.5%</div>
              <div className="text-gray-400 text-sm font-medium">System Uptime</div>
              <div className="text-gray-500 text-xs mt-1">Last 30 days</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">4.8</div>
              <div className="text-gray-400 text-sm font-medium">Average Rating</div>
              <div className="text-gray-500 text-xs mt-1">Customer feedback</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">2.3s</div>
              <div className="text-gray-400 text-sm font-medium">Response Time</div>
              <div className="text-gray-500 text-xs mt-1">API average</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-orange-400 mb-2">67%</div>
              <div className="text-gray-400 text-sm font-medium">Conversion Rate</div>
              <div className="text-gray-500 text-xs mt-1">Bookings to visits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;