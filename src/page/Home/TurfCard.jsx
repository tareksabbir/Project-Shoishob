/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const TurfCard = ({ turf, index, setHoveredCard }) => {
  const { logo, turf_name, address, _id } = turf;

  return (
    <div
      key={_id}
      className="group relative"
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <Link
        to={`/turf/${_id}`}
        className="block h-full"
      >
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 h-full overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-xl mb-4 group">
            {logo ? (
              <img
                className="h-48 md:h-32 w-full object-cover object-center rounded-xl transform group-hover:scale-110 transition-transform duration-700"
                src={logo}
                alt={turf_name}
                onError={(e) => {
                  e.target.src = "/api/placeholder/300/200";
                }}
              />
            ) : (
              <div className="h-48 w-full flex items-center justify-center bg-slate-700 text-gray-300 text-sm rounded-xl">
                No Image
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

            {/* Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              Active
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-3">
              <span className="text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text tracking-wide uppercase">
                🏟️ Turf Available
              </span>
            </div>

            <h2 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
              {turf_name}
            </h2>

            <p className="text-sm text-gray-400 mb-3 line-clamp-1">{address}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400 font-medium">
                View Details
              </span>
              <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-500/30 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Hover Border */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </Link>
    </div>
  );
};

export default TurfCard;
