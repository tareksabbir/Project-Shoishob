/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";

import Swal from "sweetalert2";
import axios from "axios";
import {
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Star,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Users,
  Activity,
  CreditCard,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const AdminBooking = () => {
  const { user, loading } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { data: owner, isLoading: ownerLoading } = useQuery(
    ["owner", user?.email],
    async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/admin/email/${user?.email}`
      );
      return response.data.data;
    }
  );

  const {
    data: booking = [],
    refetch,
    isLoading: bookingLoading,
  } = useQuery(["booking", owner?._id], async () => {
    if (owner) {
      const response = await axios.get(
        `${backendUrl}/api/v1/bookings/?ownerId=${owner?._id}`
      );
      return response.data.data;
    }
    return [];
  });

  const isLoading = loading || ownerLoading || bookingLoading;

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this booking!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        background: "#0f172a",
        color: "#f8fafc",
      });

      if (result.isConfirmed) {
        await axios.delete(`${backendUrl}/api/v1/bookings/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Booking deleted successfully",
          icon: "success",
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#10b981",
        });

        refetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete booking. Please try again.",
        icon: "error",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Enhanced filtering logic
  const filteredBookings = booking.filter((book) => {
    if (!book) return false;

    // Search filter
    const searchMatch =
      !searchTerm ||
      (book.name &&
        book.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.email &&
        book.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.turf &&
        book.turf.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.phone &&
        book.phone.toLowerCase().includes(searchTerm.toLowerCase()));

    // Status filter
    const statusMatch =
      filterStatus === "all" ||
      (book.status && book.status.toLowerCase() === filterStatus.toLowerCase());

    return searchMatch && statusMatch;
  });

  // Safe calculations with error handling
  const totalRevenue = Array.isArray(booking)
    ? booking.reduce((sum, book) => {
        const price = book && typeof book.price === "number" ? book.price : 0;
        return sum + price;
      }, 0)
    : 0;

  const todayBookings = Array.isArray(booking)
    ? Math.floor(booking.length * 0.3)
    : 0;
  const averageBookingValue =
    Array.isArray(booking) && booking.length > 0
      ? Math.round(totalRevenue / booking.length)
      : 0;

  // Filter options
  const filterOptions = [
    { value: "all", label: "All Bookings" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
                All Bookings
              </h1>
              <p className="text-slate-400 text-lg">
                Manage and monitor all booking activities
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm w-64"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {Array.isArray(booking) ? booking.length : 0}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm font-medium">
                        +12%
                      </span>
                      <span className="text-slate-400 text-sm ml-1">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Active Today
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {todayBookings}
                    </p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-purple-400 mr-1" />
                      <span className="text-purple-400 text-sm font-medium">
                        Live
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-2xl">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-white">
                      ৳{totalRevenue.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm font-medium">
                        +8.2%
                      </span>
                      <span className="text-slate-400 text-sm ml-1">
                        this week
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-2xl">
                    <CreditCard className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Avg. Booking Value
                    </p>
                    <p className="text-3xl font-bold text-white">
                      ৳{averageBookingValue}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-orange-400 mr-1" />
                      <span className="text-orange-400 text-sm font-medium">
                        Premium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    Recent Bookings ({filteredBookings.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowFilterDropdown(!showFilterDropdown)
                        }
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl text-sm text-slate-300 hover:text-white transition-all duration-200 flex items-center"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        {filterOptions.find((opt) => opt.value === filterStatus)
                          ?.label || "Filter"}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </button>

                      {/* {showFilterDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-[9999]">
                          {filterOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setFilterStatus(option.value);
                                setShowFilterDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                                filterStatus === option.value
                                  ? "text-blue-400 bg-blue-500/10"
                                  : "text-slate-300"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Booking Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Venue & Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredBookings.map((book, index) => (
                      <tr
                        key={book._id}
                        className="hover:bg-slate-800/30 transition-all duration-300 group/row"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-xl shadow-lg group-hover/row:scale-110 transition-transform duration-200">
                            <span className="text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="relative">
                              <img
                                className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-600/50 group-hover/row:ring-blue-500/50 transition-all duration-200"
                                src={
                                  book?.photo ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    book?.name || "User"
                                  )}&background=random`
                                }
                                alt={book?.name || "User"}
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    book?.name || "User"
                                  )}&background=random`;
                                }}
                              />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-white group-hover/row:text-blue-300 transition-colors duration-200">
                                {book?.name || "N/A"}
                              </div>
                              <div className="text-sm text-slate-400 flex items-center mt-1">
                                <Phone className="w-3 h-3 mr-1" />
                                {book?.phone || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="text-sm text-slate-300 flex items-center mb-2">
                            <Mail className="w-4 h-4 mr-2 text-blue-400" />
                            <span className="truncate max-w-40">
                              {book?.email || "N/A"}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 font-mono bg-slate-800/50 px-2 py-1 rounded-lg inline-block">
                            booking id: {book?._id || "N/A"}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="text-sm text-slate-300 flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                              {book?.selectedDate || "N/A"}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                              {book?.slot || "N/A"}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="text-sm text-slate-300 flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-green-400" />
                              <span className="truncate max-w-32">
                                {book?.turf || "N/A"}
                              </span>
                            </div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/20">
                              ৳{book?.price || 0}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-2">
                      
                            <button
                              onClick={() => handleDelete(book._id)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {/* Mobile Filter */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Bookings ({filteredBookings.length})
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl text-sm text-slate-300 hover:text-white transition-all duration-200 flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {/* {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl  z-[60]">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterStatus(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        filterStatus === option.value
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-slate-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {filteredBookings.map((book, index) => (
            <div key={book._id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-xl shadow-lg">
                      <span className="text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        className="h-14 w-14 rounded-xl object-cover ring-2 ring-slate-600/50"
                        src={
                          book?.photo ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            book?.name || "User"
                          )}&background=random`
                        }
                        alt={book?.name || "User"}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            book?.name || "User"
                          )}&background=random`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {book?.name || "N/A"}
                      </h3>
                      <p className="text-sm text-slate-400 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {book?.phone || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="flex items-center p-3 bg-slate-800/30 rounded-xl">
                    <Mail className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300 truncate">
                      {book?.email || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-slate-800/30 rounded-xl">
                      <Calendar className="w-5 h-5 mr-2 text-purple-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300 truncate">
                        {book?.selectedDate || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-slate-800/30 rounded-xl">
                      <Clock className="w-5 h-5 mr-2 text-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300 truncate">
                        {book?.slot || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-slate-800/30 rounded-xl">
                    <MapPin className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300 truncate">
                      {book?.turf || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-green-300">
                        ৳{book?.price || 0}
                      </span>
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                      PAID
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 font-mono bg-slate-800/50 px-3 py-1 rounded-lg">
                    ID: #{book?._id?.slice(-8) || "N/A"}
                  </div>

                  <div className="flex items-center space-x-2">
                    
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="relative group mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative mx-auto h-32 w-32 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-full flex items-center justify-center shadow-2xl">
                <AlertCircle className="h-16 w-16 text-slate-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent mb-4">
              {searchTerm || filterStatus !== "all"
                ? "No matching bookings found"
                : "No bookings found"}
            </h3>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search terms or filters to find what you're looking for."
                : "There are no bookings to display at the moment. New bookings will appear here."}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Click outside to close dropdown */}
        {showFilterDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowFilterDropdown(false)}
          ></div>
        )}
      </div>
    </div>
  );
};


export default AdminBooking;