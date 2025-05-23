/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import print from "../../../assets/icons/icons8-print-48.png";
import coin from "../../../assets/icons/star (1).png";
import Loading from "../../Loading/Loading";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const { data: booking = [], isLoading } = useQuery(
    ["booking", transactionId],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings/payment/details/${transactionId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  const handlePayHistory = async (pay) => {
    const payHistory = {
      name: pay.name,
      email: pay.email,
      phone: pay.phone,
      transactionId: pay.transactionId,
      slots: pay.slot,
      date: pay.selectedDate,
      turf: pay.turf,
      price: pay.price,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/history/post-pay-data`,
        payHistory,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        Swal.fire({
          title: "Success!",
          text: "Your Invoice has been saved successfully",
          icon: "success",
          background: "#1e293b",
          color: "#ffffff",
          confirmButtonColor: "#8b5cf6",
        });
      }
    } catch (error) {
      console.error("Error saving payment history:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save invoice",
        icon: "error",
        background: "#1e293b",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating orbs with success theme */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Success celebration elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-2xl animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Your booking has been confirmed. Please save your invoice for future reference.
            </p>
            
            {/* Success stats */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 text-sm font-medium">Transaction Complete</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-slate-300 text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Enhanced Invoice Card */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Invoice Details</h2>
                    <p className="text-slate-400">Transaction ID: {transactionId}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-slate-600/50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span className="text-sm font-medium">Print Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Invoice Content */}
              <div className="p-8">
                <div className="space-y-8">
                  {booking.map((booked, index) => (
                    <div key={booked._id} className="relative">
                      {/* Booking Card */}
                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                          
                          {/* Customer & Turf Info */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                  {booked?.photo ? (
                                    <img
                                      src={booked.photo}
                                      alt="Turf"
                                      className="w-full h-full object-cover rounded-xl"
                                    />
                                  ) : (
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">{booked?.name}</h3>
                                <p className="text-slate-300 text-sm mb-1">{booked?.email}</p>
                                <p className="text-slate-400 text-sm">{booked?.phone}</p>
                              </div>
                            </div>
                          </div>

                          {/* Booking Details */}
                          <div className="space-y-3">
                            <div>
                              <p className="text-slate-400 text-sm font-medium">Turf & Schedule</p>
                              <p className="text-white font-semibold">{booked.turf}</p>
                              <p className="text-slate-300 text-sm">{booked.selectedDate}</p>
                              <p className="text-slate-400 text-sm">{booked.slot}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-400 text-sm">Transaction:</span>
                              <span className="text-slate-300 text-sm font-mono bg-slate-800/50 px-2 py-1 rounded">
                                {booked.transactionId}
                              </span>
                            </div>
                          </div>

                          {/* Actions & Price */}
                          <div className="flex flex-col items-end space-y-4">
                            <div className="text-right">
                              <p className="text-slate-400 text-sm">Total Amount</p>
                              <p className="text-2xl font-bold text-emerald-400">৳{booked.price}</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {/* Payment Status */}
                              {booked.price && !booked?.paid ? (
                                <Link to={`/dashboard/payment/${booked._id}`}>
                                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="text-sm">Pay Now</span>
                                  </button>
                                </Link>
                              ) : (
                                <div className="flex items-center space-x-2 bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-xl">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-sm font-medium">Paid</span>
                                </div>
                              )}

                              {/* Save History Button */}
                              <button
                                onClick={() => handlePayHistory(booked)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                <span className="text-sm font-medium">Save</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="text-lg font-semibold">Print All Invoices</span>
            </button>
            
            <Link to="/dashboard" className="flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 border border-slate-600/50 group">
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-lg font-semibold">Go to Dashboard</span>
            </Link>
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-6 py-3 rounded-full">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-slate-300 text-sm">Keep this invoice for your records and future reference</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;