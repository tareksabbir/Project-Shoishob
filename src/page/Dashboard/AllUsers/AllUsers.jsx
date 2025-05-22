/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";
import {
  Crown,
  User,
  Eye,
  Trash2,
  Shield,
  Search,
  Filter,
  MoreVertical,
  Mail,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";

const AllUsers = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery(["users"], async () => {
    const res = await axios.get(`${API_URL}/api/v1/user`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return res.data.data;
  });

  const handleUserDetails = () => {
    console.log("user profile ");
  };

  const handleDelete = (id, userName) => {
    Swal.fire({
      title: "Delete User",
      text: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete User",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/api/v1/user/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success",
              background: "#1f2937",
              color: "#f9fafb",
            });
            refetch();
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete user. Please try again.",
              icon: "error",
              background: "#1f2937",
              color: "#f9fafb",
            });
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    const id = user._id;
    Swal.fire({
      title: "Grant Admin Access",
      text: `Grant admin privileges to ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Grant Admin",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
    }).then((result) => {
      if (result.isConfirmed) {
        const makeAdmin = { role: "admin" };
        axios
          .patch(`${API_URL}/api/v1/user/${id}`, makeAdmin, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then(() => {
            refetch();
            saveAdmin(user);
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user role. Please try again.",
              icon: "error",
              background: "#1f2937",
              color: "#f9fafb",
            });
          });
      }
    });
  };

  const saveAdmin = (user) => {
    const saveUserAdmin = {
      name: user.name,
      email: user.email,
      photo: user?.photo,
      id: user._id,
      role: "admin",
    };
    axios
      .post(`${API_URL}/api/v1/admin/create-admin`, saveUserAdmin, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: `${user.name} has been granted admin privileges.`,
          icon: "success",
          timer: 3000,
          background: "#1f2937",
          color: "#f9fafb",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Warning",
          text: "User role updated but failed to save admin permissions.",
          icon: "warning",
          background: "#1f2937",
          color: "#f9fafb",
        });
      });
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "admin" && user.role === "admin") ||
      (filter === "user" && user.role !== "admin");

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalUsers = users.length;
  const adminCount = users.filter((user) => user.role === "admin").length;
  const regularUserCount = totalUsers - adminCount;

  const getFilterLabel = () => {
    switch (filter) {
      case "admin":
        return "Admins Only";
      case "user":
        return "Regular Users";
      default:
        return "All Users";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse"></div>
            </div>
            <div className="text-center">
              <p className="text-white text-xl font-semibold">
                Loading users...
              </p>
              <p className="text-white/60 text-sm mt-1">
                Please wait while we fetch the data
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-full">
      <div className="relative z-10 p-6">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="mb-8 relative z-10">
            <div className="bg-white/1 backdrop-blur-lg rounded-3xl px-10 mt-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    User Management
                  </h1>
                  <p className="text-white/70 mt-2 text-lg">
                    Manage users and assign admin privileges with ease
                  </p>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all w-full sm:w-64"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative z-50" ref={filterRef}>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border border-blue-400/30 text-white px-4 py-3 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg hover:shadow-blue-500/25 min-w-40"
                    >
                      <Filter size={18} />
                      <span className="flex-1 text-left">
                        {getFilterLabel()}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          showFilters ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showFilters && (
                      <div className="absolute top-full mt-2 right-0 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden min-w-48 z-50">
                        <div className="p-2">
                          {[
                            {
                              value: "all",
                              label: "All Users",
                              count: totalUsers,
                            },
                            {
                              value: "admin",
                              label: "Administrators",
                              count: adminCount,
                            },
                            {
                              value: "user",
                              label: "Regular Users",
                              count: regularUserCount,
                            },
                          ].map((filterOption) => (
                            <button
                              key={filterOption.value}
                              onClick={() => {
                                setFilter(filterOption.value);
                                setShowFilters(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left hover:bg-white/10 transition-colors ${
                                filter === filterOption.value
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                                  : "text-white"
                              }`}
                            >
                              <span className="font-medium">
                                {filterOption.label}
                              </span>
                              <span
                                className={`text-sm px-2 py-1 rounded-full ${
                                  filter === filterOption.value
                                    ? "bg-blue-400/20 text-blue-300"
                                    : "bg-white/10 text-white/60"
                                }`}
                              >
                                {filterOption.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filter !== "all" || searchTerm) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10 ">
                  {filter !== "all" && (
                    <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                      Filter: {getFilterLabel()}
                      <button
                        onClick={() => setFilter("all")}
                        className="hover:bg-blue-400/20 p-0.5 rounded-full transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:bg-purple-400/20 p-0.5 rounded-full transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-5 md:px-10 -z-50">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {totalUsers}
                  </p>
                </div>
                <div className="bg-blue-500/30 p-3 rounded-xl">
                  <Users className="text-blue-300 w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm font-medium">
                    Administrators
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {adminCount}
                  </p>
                </div>
                <div className="bg-yellow-500/30 p-3 rounded-xl">
                  <Crown className="text-yellow-300 w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/20 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">
                    Regular Users
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {regularUserCount}
                  </p>
                </div>
                <div className="bg-green-500/30 p-3 rounded-xl">
                  <User className="text-green-300 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 px-5 md:px-10">
            {filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className="group bg-white/1 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 rounded-2xl p-6 border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={user.photo || "/api/placeholder/56/56"}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-3 border-white/30 ring-2 ring-purple-400/30"
                      />
                      {user.role === "admin" && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 p-1.5 rounded-full shadow-lg">
                          <Crown size={14} className="text-gray-900" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white text-lg font-bold truncate">
                        {user.name}
                      </h3>
                      <p className="text-white/50 text-sm">
                        #{String(index + 1).padStart(3, "0")}
                      </p>
                    </div>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg">
                    <MoreVertical size={16} className="text-white/70" />
                  </button>
                </div>

                {/* User Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Mail size={14} />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <MapPin size={14} />
                    <span className="text-sm">Chittagong</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-xs font-mono text-white/50 break-words">
                      ID: {user._id}
                    </p>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center px-3 py-2 text-sm rounded-full font-semibold backdrop-blur-sm border
                    ${
                      user.role === "admin"
                        ? "bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30"
                        : "bg-gradient-to-r from-blue-400/20 to-blue-500/20 text-blue-300 border-blue-400/30"
                    }
                  `}
                  >
                    {user.role === "admin" ? (
                      <Crown size={16} />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="ml-2">
                      {user.role === "admin" ? "Administrator" : "Regular User"}
                    </span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-green-500/25"
                    >
                      <Shield size={16} />
                      <span>Make Admin</span>
                    </button>
                  )}

                  <button
                    onClick={handleUserDetails}
                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all duration-200 hover:shadow-lg border border-white/20"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(user._id, user.name)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User size={40} className="text-white/50" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No users found
                </h3>
                <p className="text-white/70 mb-6">
                  {searchTerm
                    ? `No users match "${searchTerm}". Try adjusting your search.`
                    : "Try changing the filter to see different user types."}
                </p>
                {(searchTerm || filter !== "all") && (
                  <div className="flex gap-3 justify-center">
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        Clear Search
                      </button>
                    )}
                    {filter !== "all" && (
                      <button
                        onClick={() => setFilter("all")}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        Show All Users
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
