/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import coin from "../../../assets/icons/star (1).png";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Trash2,
  CreditCard,
  CheckCircle,
  Receipt,
  Star,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const PayHistory = () => {
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const { data: booking = [], refetch } = useQuery(
    ["booking", user?.email],
    async () => {
      if (!user?.email) return [];

      // Changed from /history/email/ to /bookings/user/
      const res = await axios.get(
        `${API_URL}/api/v1/bookings/user/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data.data;
    },
    {
      enabled: !!user?.email,
    }
  );

  // Calculate total spent
  const totalSpent = booking.reduce((sum, item) => sum + (item.price || 0), 0);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this payment record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#f1f5f9",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/api/v1/bookings/${id}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Payment record deleted successfully.",
              icon: "success",
              background: "#1e293b",
              color: "#f1f5f9",
            });
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting booking:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to delete payment record!",
              background: "#1e293b",
              color: "#f1f5f9",
            });
          });
      }
    });
  };
  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-8 relative">
      {/* Background Blur Effect */}
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px] opacity-30"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -1,
        }}
      />

      <div className="mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Payment History
          </h1>
          <p className="text-slate-400 text-lg">
            Track all your turf booking payments and transactions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500  mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Payments</p>
                <p className="text-2xl font-bold text-white">
                  {booking.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">৳{totalSpent}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Average Payment</p>
                <p className="text-2xl font-bold text-white">
                  ৳
                  {booking.length > 0
                    ? Math.round(totalSpent / booking.length)
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        {booking.length > 0 ? (
          <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-600">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Customer Info
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Transaction Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Turf & Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {booking.map((booked, index) => (
                    <tr
                      key={booked._id}
                      className="hover:bg-slate-700/50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {booked?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                              {booked?.name}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-400 text-sm">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{booked?.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-400 text-sm">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{booked?.phone}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-slate-300">
                              Transaction ID
                            </span>
                          </div>
                          <div className="bg-slate-700 rounded-lg p-2 border border-slate-600">
                            <code className="text-xs text-green-400 font-mono">
                              {booked.transactionId}
                            </code>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-white font-medium">
                              {booked.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <span className="text-slate-400 text-sm">
                              {booked.slots}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-semibold text-white">
                            {booked.turf}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-green-400 font-bold text-lg">
                              ৳{booked.price}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <img
                              src={coin}
                              className="w-8 h-8 animate-pulse"
                              alt="Payment success"
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-slate-800"></div>
                          </div>
                          <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-xs font-medium">Paid</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(booked._id)}
                          className="group bg-slate-700 hover:bg-red-500 text-slate-400 hover:text-white p-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
                          title="Delete payment record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-9 h-9 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Payment History
            </h3>
            <p className="text-slate-400 mb-6">
              You haven't made any payments yet.
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25">
              <CreditCard className="w-5 h-5" />
              <span>Make Your First Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayHistory;
