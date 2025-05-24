import { Link } from "react-router-dom";
import { Clock, Users, Star, Calendar } from "lucide-react";

const GoBooking = () => {
  return (
    <section className="max-w-7xl mx-auto text-white  min-h-screen">
      <div className="mx-auto ">
       

        {/* Pricing Table */}
        <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b border-blue-400/30">
                  <th className="px-6 py-4 text-lg font-semibold text-blue-100 text-left">
                    Package
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-blue-100">
                    <div className="flex items-center justify-center">
                      <Users className="w-5 h-5 mr-2" />
                      Players
                    </div>
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-blue-100">
                    <div className="flex items-center justify-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Duration
                    </div>
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-blue-100">
                    Price (BDT)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-400/20 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5">
                    <div className="text-left">
                      <div className="text-lg font-medium text-white">Basic</div>
                      <div className="text-sm text-blue-200">Perfect for casual games</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-blue-100 font-medium">10</td>
                  <td className="px-6 py-5 text-blue-100 font-medium">60 min</td>
                  <td className="px-6 py-5">
                    <span className="text-2xl font-bold text-blue-300">৳3,000</span>
                  </td>
                </tr>
                <tr className="border-b border-blue-400/20 hover:bg-white/5 transition-colors bg-blue-800/30">
                  <td className="px-6 py-5">
                    <div className="text-left">
                      <div className="text-lg font-medium text-white flex items-center">
                        Standard 
                        <span className="ml-2 px-2 py-1 bg-blue-500 text-xs rounded-full">POPULAR</span>
                      </div>
                      <div className="text-sm text-blue-200">Most chosen package</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-blue-100 font-medium">12</td>
                  <td className="px-6 py-5 text-blue-100 font-medium">60 min</td>
                  <td className="px-6 py-5">
                    <span className="text-2xl font-bold text-blue-300">৳3,400</span>
                  </td>
                </tr>
                <tr className="border-b border-blue-400/20 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5">
                    <div className="text-left">
                      <div className="text-lg font-medium text-white">Premium</div>
                      <div className="text-sm text-blue-200">Extended play time</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-blue-100 font-medium">14</td>
                  <td className="px-6 py-5 text-blue-100 font-medium">60 min</td>
                  <td className="px-6 py-5">
                    <span className="text-2xl font-bold text-blue-300">৳3,800</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5">
                    <div className="text-left">
                      <div className="text-lg font-medium text-white flex items-center">
                        Exclusive
                        <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-medium">VIP</span>
                      </div>
                      <div className="text-sm text-blue-200">Full amenities included</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-blue-100 font-medium">16</td>
                  <td className="px-6 py-5 text-blue-100 font-medium">60 min</td>
                  <td className="px-6 py-5">
                    <span className="text-2xl font-bold text-blue-300">৳4,000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Professional Turf</h3>
            <p className="text-blue-200 text-sm">FIFA standard artificial grass surface</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Timing</h3>
            <p className="text-blue-200 text-sm">Available 6 AM to 12 AM daily</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Facilities</h3>
            <p className="text-blue-200 text-sm">Changing rooms, parking & refreshments</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a 
            href="#details" 
            className="inline-flex items-center justify-center px-8 py-3 text-blue-300 border-2 border-blue-300 rounded-full hover:bg-blue-300 hover:text-blue-900 transition-all duration-300 font-medium"
          >
            View Details
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-full hover:from-blue-600 hover:to-sky-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Now
            <Calendar className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm">
            * All prices include basic equipment. Advanced booking required.
          </p>
          <p className="text-blue-300 text-sm mt-2">
            📞 For group bookings and corporate events, call: +88 01XXX-XXXXXX
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoBooking;