import GoBooking from "./GoBooking";
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import {
  MapPin,
  Shield,
  Star,
  Clock,
  AlertCircle,
  RefreshCw,
  Trophy,
  Info,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Loading Skeleton Components
const ImageSkeleton = () => (
  <div className="rounded-2xl h-80 md:h-96 overflow-hidden bg-slate-700/50 animate-pulse">
    <div className="w-full h-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"></div>
  </div>
);

const ProfileSkeleton = () => (
  <div className="text-center space-y-4">
    <div className="w-24 h-24 rounded-full bg-slate-700 animate-pulse mx-auto"></div>
    <div className="space-y-2">
      <div className="h-6 bg-slate-700 rounded w-32 animate-pulse mx-auto"></div>
      <div className="w-16 h-1 bg-slate-600 rounded animate-pulse mx-auto"></div>
      <div className="h-4 bg-slate-700 rounded w-40 animate-pulse mx-auto"></div>
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 bg-slate-700 rounded w-48 animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-slate-700 rounded w-4/5 animate-pulse"></div>
    </div>
  </div>
);

const TurfDetails = () => {
  const [turfDetails, setTurfDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendURL}/api/v1/turf/${id}`);

        setTurfDetails(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load turf details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTurfDetails();
    }
  }, [id]);

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <ImageSkeleton />

            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2">
                <ContentSkeleton />
              </div>
              <div>
                <ProfileSkeleton />
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    );
  }

  // Main Content
  const { cover, logo, turf_name, address, about, rules } = turfDetails || {};

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Cover Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
              <img
                alt={`${turf_name} cover`}
                className="w-full h-80 md:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={cover}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800";
                }}
              />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1">
                      <img
                        src={logo}
                        alt={`${turf_name} logo`}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150";
                        }}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {turf_name}
                    </h1>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{address}, Chittagong, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Turf Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Info className="w-6 h-6 mr-3 text-cyan-500" />
                    About This Turf
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {about || "No description available for this turf."}
                  </p>
                </div>

                {/* Rules Section */}
                {rules && (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Shield className="w-6 h-6 mr-3 text-orange-500" />
                      Rules & Regulations
                    </h2>
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-l-4 border-orange-500 rounded-r-lg p-6">
                      <p className="text-gray-300 italic text-lg leading-relaxed">
                        "{rules}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Turf Info Sidebar */}
              <div className="space-y-6">
                {/* Quick Info Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Turf Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-cyan-500/40 transition-colors">
                      <MapPin className="w-5 h-5 text-cyan-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">{address}</p>
                        <p className="text-cyan-400 text-sm">
                          Chittagong, Bangladesh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-green-500/40 transition-colors">
                      <Clock className="w-5 h-5 text-green-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Operating Hours</p>
                        <p className="text-white font-medium">
                          4:00 PM - 2:00 AM
                        </p>
                        <p className="text-green-400 text-sm">7 Days a Week</p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-blue-500/40 transition-colors">
                      <Trophy className="w-5 h-5 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Facility Type</p>
                        <p className="text-white font-medium">
                          Premium Artificial Turf
                        </p>
                        <p className="text-blue-400 text-sm">
                          Professional Grade
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">
                    Customer Rating
                  </h3>
                  <div className="text-center">
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= 4
                              ? "text-yellow-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-white">4.0</p>
                    <p className="text-gray-400 text-sm">
                      Based on 127 reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoBooking />;{/* Background Effects */}
      </section>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="fixed z-10 max-w-screen-xl mx-auto px-4 md:px-8"></div>
    </div>
  );
};

export default TurfDetails;
