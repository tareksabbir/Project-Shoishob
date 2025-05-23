/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Mail, 
  Phone, 
  Trash2, 
  IdCard, 
  CalendarX, 
  Plus,
  Check
} from "lucide-react";

const UserMyBooking = () => {
  const { user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { data: booking = [], refetch } = useQuery(
    ["booking", user?.email],
    async () => {
      const res = await axios.get(
        `${backendURL}/api/v1/bookings/email/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data.data;
    }
  );

  const handleAutoDelete = async (booking) => {
    const creationTime = new Date(booking.createdAt);
    const timeDifference = Math.floor(
      (currentTime - creationTime) / (1000 * 60)
    );

    if (timeDifference >= 60 && booking.price && booking.paid === false) {
      try {
        await axios.delete(`${backendURL}/api/v1/bookings/${booking._id}`);
        // Optional: refetch() if you want the UI to update immediately
      } catch (error) {
        console.error("Auto-delete failed:", error);
      }
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      background: "#1e293b",
      color: "#f1f5f9",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${backendURL}/api/v1/bookings/${id}`);
          Swal.fire({
            title: "Done!!",
            text: "Booking deleted successfully.",
            icon: "success",
            background: "#1e293b",
            color: "#f1f5f9",
          });
          refetch();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error",
            background: "#1e293b",
            color: "#f1f5f9",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-8">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            My Bookings
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your turf reservations and payments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500  mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{booking.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Paid Bookings</p>
                <p className="text-2xl font-bold text-white">
                  {booking.filter(b => b.paid).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Payment</p>
                <p className="text-2xl font-bold text-white">
                  {booking.filter(b => b.price && !b.paid).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
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
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Turf Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Contact & ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {booking.map((booked, index) => {
                    handleAutoDelete(booked);
                    return (
                      <tr 
                        key={booked._id} 
                        className="hover:bg-slate-700/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8 bg-slate-600 rounded-full text-sm font-medium text-white group-hover:bg-blue-500 transition-colors duration-200">
                            {index + 1}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                className="w-14 h-14 rounded-xl object-cover border-2 border-slate-600 group-hover:border-blue-400 transition-colors duration-200"
                                src={booked?.photo}
                                alt="Turf"
                              />
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                                {booked.name}
                              </div>
                              <div className="text-slate-400 text-sm flex items-center space-x-1">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <span>{booked.phone}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="text-slate-300 text-sm flex items-center space-x-1">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{booked.email}</span>
                            </div>
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                              <IdCard className="w-3 h-3 text-slate-400 mr-1" />
                              ID: {booked._id.slice(-8)}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="text-white font-medium">{booked.selectedDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="text-slate-400 text-sm">{booked.slot}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-white font-semibold">{booked.turf}</div>
                            <div className="text-green-400 font-bold text-lg">
                              ৳{booked.price}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          {booked.price && !booked?.paid ? (
                            <Link to={`/dashboard/payment/${booked._id}`}>
                              <button className="relative group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5">
                                <div className="flex items-center space-x-2">
                                  <CreditCard className="w-4 h-4" />
                                  <span className="text-sm font-medium">Pay Now</span>
                                </div>
                              </button>
                            </Link>
                          ) : (
                            <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
                              <Check className="w-4 h-4" />
                              <span className="text-sm font-medium">Paid</span>
                            </div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete(booked._id)}
                            className="group bg-slate-700 hover:bg-red-500 text-slate-400 hover:text-white p-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-9 h-9 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No Bookings Found</h3>
            <p className="text-slate-400 mb-6">You haven't made any turf bookings yet.</p>
            <Link 
              to="/booking" 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>Book Your First Turf</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMyBooking;