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
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Secure Payment Gateway
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Complete your turf booking with our secure payment system. Please verify your information before proceeding.
            </p>
          </div>

          {/* Payment Form Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 lg:p-12">
            <form onSubmit={handleSubmit(handleForm)} className="space-y-8">
              
              {/* Booking Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
                  <h2 className="text-2xl font-semibold text-white">Booking Information</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Turf Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("turf_name")}
                      placeholder="Turf Name"
                      value={booking.turf}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("email")}
                      placeholder="Your Email address"
                      value={booking.email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Booking ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-mono"
                      {...register("bookingId")}
                      placeholder="Booking ID"
                      value={booking._id}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("phone")}
                      placeholder="Your phone Number"
                      defaultValue={booking.phone}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                <div className="px-4 text-slate-400 text-sm">Contact Details</div>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    {...register("address")}
                    placeholder="Your Address"
                    defaultValue={booking.address}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("city")}
                      placeholder="City"
                      defaultValue="Chittagong"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Price (Taka)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-semibold">৳</span>
                      <input
                        type="text"
                        className="w-full pl-8 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-mono"
                        {...register("price")}
                        placeholder="Price"
                        value={booking.price}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Number of Persons <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("person")}
                      placeholder="Number of Persons"
                      defaultValue="14"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                <div className="px-4 text-slate-400 text-sm">Booking Schedule</div>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              </div>

              {/* Schedule Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Selected Date
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("selectedDate")}
                      placeholder="Selected Date"
                      value={booking.selectedDate}
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Time Slot
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      {...register("slot")}
                      placeholder="Time Slot"
                      value={booking.slot}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-600 to-cyan-600 hover:from-purple-700 hover:via-purple-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-lg">Proceed to Secure Payment</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <div className="flex items-center justify-center mt-4 text-sm text-slate-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;