/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  const { logo, turf_name, address, _id } = turf;

  return (
    <div className="p-1 lg:w-1/5 md:w-1/3 w-1/2">
      <div className="h-full bg-slate-900 flex flex-col items-center p-6 rounded-lg transition-transform hover:scale-105">
        {logo ? (
          <img
            alt={`${turf_name} logo`}
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mb-2"
            src={logo}
            loading="lazy"
            width="64"
            height="64"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}

        <div className="flex-grow text-center">
          <h2 className="text-white mt-3 font-medium">{turf_name}</h2>
          <p className="text-gray-400 text-sm p-1">{address}</p>
          <Link
            to={`/turf/${_id}`}
            className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text px-3 py-1 text-xs hover:from-purple-400 hover:to-cyan-400"
            aria-label={`See more details about ${turf_name}`}
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
