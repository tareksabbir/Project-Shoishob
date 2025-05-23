import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading/Loading";

const Payment = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const { data: booking, isLoading } = useQuery(["booking", id], async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings/${id}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return res.data.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleForm = async (data) => {
    const bookingDataUpdate = {
      phone: data.phone,
      address: data.address,
      city: data.city,
      person: data.person,
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings/${id}`,
        bookingDataUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        console.error("No URL found in response", res.data);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating orbs with better animations */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Secure Payment Gateway
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Complete your turf booking with our secure payment system. Please verify your information before proceeding to payment.
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 ml-2"></div>
              </div>
              <span className="text-slate-400 text-sm">Step 2 of 3</span>
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-slate-600 mr-2"></div>
                <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Payment Form Card */}
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-8 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Payment Information</h2>
                    <p className="text-slate-400">Please review and complete your booking details</p>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium">SSL Secured</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(handleForm)} className="p-8 lg:p-12 space-y-10">
                
                {/* Booking Information Section */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Booking Information</h3>
                      <p className="text-slate-400">Your reservation details</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Turf Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        {...register("turf_name")}
                        placeholder="Turf Name"
                        value={booking.turf}
                        readOnly
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        {...register("email")}
                        placeholder="Your Email address"
                        value={booking.email}
                        readOnly
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Booking ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-mono text-sm"
                        {...register("bookingId")}
                        placeholder="Booking ID"
                        value={booking._id}
                        readOnly
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        {...register("phone")}
                        placeholder="Your phone Number"
                        defaultValue={booking.phone}
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative flex items-center justify-center py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                  </div>
                  <div className="relative bg-slate-800 px-6 py-2 rounded-full">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">Contact Details</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                      {...register("address")}
                      placeholder="Your Address"
                      defaultValue={booking.address}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        City <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        {...register("city")}
                        placeholder="City"
                        defaultValue="Chittagong"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Price (Taka)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold text-lg">৳</span>
                        <input
                          type="text"
                          className="w-full pl-10 pr-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-mono text-lg font-semibold"
                          {...register("price")}
                          placeholder="Price"
                          value={booking.price}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Number of Persons <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        {...register("person")}
                        placeholder="Number of Persons"
                        defaultValue="14"
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative flex items-center justify-center py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                  </div>
                  <div className="relative bg-slate-800 px-6 py-2 rounded-full">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Booking Schedule</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Selected Date
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="text"
                        className="w-full pl-12 pr-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        {...register("selectedDate")}
                        placeholder="Selected Date"
                        value={booking.selectedDate}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Time Slot
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <input
                        type="text"
                        className="w-full pl-12 pr-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        {...register("slot")}
                        placeholder="Time Slot"
                        value={booking.slot}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Payment Button */}
                <div className="pt-12">
                  <button 
                    type="submit"
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-600 to-cyan-600 hover:from-purple-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 group"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center justify-center space-x-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-xl">Proceed to Secure Payment</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className="flex items-center justify-center mt-6 text-slate-400">
                    <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm font-medium">256-bit SSL Encryption</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;