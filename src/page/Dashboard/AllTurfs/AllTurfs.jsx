/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapPin, Users, Clock, Edit3, Eye, Trash2, Star } from "lucide-react";

const AllTurfs = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "https://shoihob-backend.vercel.app";

  const {
    data: turfs = [],
    isLoading,
    error,
  } = useQuery(["booking"], async () => {
    const res = await axios.get(`${backendUrl}/api/v1/turf/details`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h3 className="text-xl font-semibold mb-2">Error loading turfs</h3>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className=" mx-auto px-12 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Turf Management
              </h1>
              <p className="text-gray-400">Manage all your turf facilities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <span className="text-gray-300 text-sm">Total Turfs: </span>
                <span className="text-cyan-400 font-semibold">
                  {turfs.length}
                </span>
              </div>
              <Link
                to="/dashboard/addTurf"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add New Turf
              </Link>
            </div>
          </div>
        </div>

        {/* Turfs Grid */}
        {turfs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No turfs found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first turf facility
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {turfs.map((turf) => (
              <div
                key={turf._id}
                className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 group overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={turf.cover || "/api/placeholder/400/200"}
                    alt={turf.turf_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-cyan-400 text-sm font-medium">
                        ৳{turf.price}/hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={turf.logo || "/api/placeholder/60/60"}
                      alt={turf.turf_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg truncate">
                        {turf.turf_name}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="truncate">
                          {turf.address}, {turf.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                      <div className="text-white text-sm font-medium">
                        {turf.person ? turf.person.length : 0} Groups
                      </div>
                      <div className="text-gray-400 text-xs">Available</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-white text-sm font-medium">
                        {turf.slots ? turf.slots.length : 0} Slots
                      </div>
                      <div className="text-gray-400 text-xs">Available</div>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="bg-gray-700/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={turf.ownerId?.photo || "/api/placeholder/30/30"}
                        alt={turf.ownerId?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300 text-sm truncate">
                          {turf.ownerId?.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {turf.ownerPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/turf/${turf._id}`}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                    <Link
                      to={`/dashboard/turfUpdate/${turf._id}`}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      Updated: {new Date(turf.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTurfs;
