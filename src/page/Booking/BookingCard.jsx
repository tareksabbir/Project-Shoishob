/* eslint-disable react/prop-types */

const BookingCard = ({ turf, setBooking }) => {
  const { logo, turf_name, slots, price } = turf;

  const isFullyBooked = !slots || slots.length === 0;

  return (
    <div className="group relative">
      {/* Main Card Container */}
      <div className="relative h-full bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:border-slate-600/70 overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

        {/* Top Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl border ${
              isFullyBooked
                ? "bg-red-500/20 border-red-500/30 text-red-300"
                : "bg-green-500/20 border-green-500/30 text-green-300"
            }`}
          >
            {isFullyBooked ? "Booked" : "Available"}
          </div>
        </div>

        {/* Turf Logo Section */}
        <div className="relative flex justify-center mb-6">
          <div className="relative group/logo">
            {/* Logo Container with Animated Border */}
            <div
              className={`relative w-20 h-20 rounded-2xl p-1 ${
                isFullyBooked
                  ? "bg-gradient-to-r from-gray-600 to-gray-700"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-cyan-500/25"
              } group-hover:animate-pulse`}
            >
              <img
                alt={`${turf_name} logo`}
                className="w-full h-full object-cover rounded-xl bg-slate-700"
                src={logo}
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTYiIGZpbGw9IiM0NzUyNjkiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ij4KPHBhdGggZD0iTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43MzRsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzM0bDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6Ii8+CjxwYXRoIGQ9Im0zLjI5IDguMTUgOC4yMiA0LjE3YTEgMSAwIDAgMCAuOTggMGw4LjIyLTQuMTciLz4KPHBhdGggZD0iTTEyIDIuNzZ2OC40NCIvPgo8L3N2Zz4KPC9zdmc+";
                }}
              />
            </div>

            {/* Status Indicator Dot */}
            {!isFullyBooked && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Turf Name */}
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-xl leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {turf_name}
          </h3>
        </div>

        {/* Availability Info */}
        <div className="space-y-4 mb-6">
          {/* Slots Available */}
          <div className="flex items-center justify-between bg-slate-700/50 backdrop-blur-sm rounded-xl p-3 border border-slate-600/30">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-gray-300 text-sm font-medium">
                Time Slots
              </span>
            </div>
            <span
              className={`text-sm font-bold ${
                isFullyBooked ? "text-red-400" : "text-green-400"
              }`}
            >
              {isFullyBooked ? "None" : `${slots.length} Available`}
            </span>
          </div>

          {/* Next Available Slot */}
          {!isFullyBooked && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-3 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">
                  Next Available
                </span>
                <span className="text-white font-semibold">{slots[0]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="text-3xl font-black text-white mb-1">৳ {price}</div>
            <div className="text-gray-400 text-sm font-medium">per hour</div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Book Now Button */}

        <button
          onClick={() => setBooking(turf)}
          disabled={isFullyBooked}
          className={`relative w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden ${
            isFullyBooked
              ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed border border-slate-600/30'
              : 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-cyan-500/25shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95'
          }`}
        >
      
          {!isFullyBooked && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
          
          <span className="relative z-10 flex items-center justify-center space-x-2">
            {isFullyBooked ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
                <span>Fully Booked</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Book Now</span>
              </>
            )}
          </span>
        </button>
        
        {/* Bottom Accent Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${
            isFullyBooked
              ? "bg-gradient-to-r from-gray-600 to-gray-700"
              : "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      </div>

      {/* External Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </div>
  );
};

export default BookingCard;
