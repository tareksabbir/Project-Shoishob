/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  const { logo, turf_name, address, _id } = turf;
  return (
    <>
      <div className="p-1 lg:w-1/5 md:w-1/3 w-1/2 ">
        <div className="h-full bg-slate-900 items-center border-spacing-2  p-6 rounded-lg ">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
            src={logo}
          />
          <div className="flex-grow text-center">
            <h2 className="text-white mt-3 ">{turf_name}</h2>
            <p className="text-gray-400 text-sm p-1">{address}</p>
            <Link
              to={`/turf/${_id}`}
              className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text px-3 py-1 text-xs "
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TurfCard;
