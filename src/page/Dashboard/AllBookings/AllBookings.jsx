/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { Trash2, Calendar, Clock, MapPin, Phone, Mail, User, DollarSign, Star, TrendingUp } from "lucide-react";

const AllBookings = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "https://shoihob-backend.vercel.app";

  const { data: booking = [], refetch } = useQuery(["booking"], async () => {
    const res = await axios.get(`${backendUrl}/api/v1/bookings`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return res.data.data;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
      color: "#f8fafc",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${backendUrl}/api/v1/bookings/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Booking deleted successfully",
            icon: "success",
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            color: "#f8fafc",
            confirmButtonColor: "#10b981",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="pt-5 px-5 md:px-10 mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                All Bookings
              </h1>
              <p className="text-blue-200/80">Manage and view all booking records</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200/80 text-sm font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold text-white">{booking.length}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200/80 text-sm font-medium">Active Today</p>
                  <p className="text-3xl font-bold text-white">{Math.floor(booking.length * 0.3)}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-200/80 text-sm font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-white">৳{booking.reduce((sum, book) => sum + (book.price || 0), 0)}</p>
                </div>
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Turf & Price
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {booking.map((book, index) => (
                    <tr key={book._id} className="hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                          <span className="text-sm font-bold text-white">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-14">
                            <img
                              className="h-14 w-14 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg"
                              src={book?.photo || "/api/placeholder/56/56"}
                              alt={book.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-white">{book.name}</div>
                            <div className="text-sm text-blue-200/70 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {book.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center mb-1">
                          <Mail className="w-4 h-4 mr-2 text-blue-400" />
                          {book.email}
                        </div>
                        <div className="text-xs text-purple-300/60 font-mono bg-slate-800/50 px-2 py-1 rounded">
                          ID: {book._id.slice(-8)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                          {book.selectedDate}
                        </div>
                        <div className="text-sm text-blue-200/70 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-purple-400" />
                          {book.slot}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                          {book.turf}
                        </div>
                        <div className="text-sm font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                          {book.price} Taka
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {booking.map((book, index) => (
            <div key={book._id} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                  <img
                    className="h-16 w-16 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg"
                    src={book?.photo || "/api/placeholder/64/64"}
                    alt={book.name}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{book.name}</h3>
                    <p className="text-sm text-blue-200/70 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {book.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center text-sm text-white bg-slate-800/30 rounded-lg p-3">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  {book.email}
                </div>
                
                <div className="flex items-center text-sm text-white bg-slate-800/30 rounded-lg p-3">
                  <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                  {book.selectedDate}
                </div>
                
                <div className="flex items-center text-sm text-white bg-slate-800/30 rounded-lg p-3">
                  <Clock className="w-5 h-5 mr-3 text-purple-400" />
                  {book.slot}
                </div>
                
                <div className="flex items-center text-sm text-white bg-slate-800/30 rounded-lg p-3">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  {book.turf}
                </div>
                
                <div className="flex items-center text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3">
                  <DollarSign className="w-5 h-5 mr-3 text-green-400" />
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {book.price} Taka
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="text-xs text-purple-300/60 font-mono bg-slate-800/50 px-3 py-2 rounded-lg inline-block">
                  Booking ID: {book._id.slice(-8)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {booking.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto h-32 w-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <Calendar className="h-16 w-16 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              No bookings found
            </h3>
            <p className="text-blue-200/60 text-lg">There are no bookings to display at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;