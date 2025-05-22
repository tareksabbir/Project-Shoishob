/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmailCollect from "../Home/EmailCollect";
import axios from "axios";

export default function Featured() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const {
    data: tournament = [],
    isLoading,
    isError,
  } = useQuery(["tournament"], async () => {
    try {
      const res = await axios.get(`${backendURL}/api/v1/tournament-details`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data.data || [];
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      throw err;
    }
  });

  // Enhanced loading skeleton
  if (isLoading) {
    return (
      <main className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-12 md:py-24 overflow-hidden  ">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <section className="relative z-10 py-24">
          <div className="container px-4 sm:px-6 mx-auto">
            {/* Header Skeleton */}
            <div className="flex flex-col lg:flex-row w-full mb-12">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <div className="h-10 w-80 bg-slate-700 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-1 w-20 bg-slate-600 rounded animate-pulse"></div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="h-4 w-full bg-slate-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 animate-pulse">
                      <div className="h-48 w-full bg-slate-700 rounded-xl mb-4"></div>
                      <div className="h-3 w-20 bg-slate-600 rounded mb-2"></div>
                      <div className="h-5 w-3/4 bg-slate-600 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-slate-600 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-400 mb-6">
            Failed to load tournaments. Please check your connection and try
            again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen overflow-hidden py-24 px-5 md:px-10">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="relative z-10 text-gray-600 body-font ">
        <div className="max-w-screen-2xl px-5 md:px-10 py-12 sm:py-16 lg:py-24 mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row w-full mb-12 lg:mb-16">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl title-font mb-4 font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Upcoming
                </span>{" "}
                <span className="text-white">Events & Tournaments</span>
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center">
              <p className="leading-relaxed text-gray-300 text-base lg:text-lg font-light">
                Stay updated on our upcoming events and tournaments, where you
                can participate and showcase your skills. Join us for thrilling
                competitions, engaging activities, and memorable experiences.
                Don't miss out on the excitement and opportunities that await
                you.
              </p>
            </div>
          </div>

          {tournament.length > 0 ? (
            <>
              {/* Enhanced Tournament Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {tournament.map((tur, index) => (
                  <div
                    key={tur._id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link
                      to={`/tournament-booking/${tur._id}`}
                      className="block h-full"
                    >
                      {/* Card Container */}
                      <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 h-full overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-xl mb-4 group">
                          <img
                            className="h-48 w-full object-cover object-center rounded-xl transform group-hover:scale-110 transition-transform duration-700"
                            src={tur.cover}
                            alt={tur.tournament_name}
                            onError={(e) => {
                              e.target.src = "/api/placeholder/300/200";
                            }}
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                          {/* Status Badge */}
                          <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                            Open
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Registration Label */}
                          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-3">
                            <span className="text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text tracking-wide uppercase">
                              🎮 Registration Open
                            </span>
                          </div>

                          {/* Tournament Name */}
                          <h2 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                            {tur.tournament_name}
                          </h2>

                          {/* Action Indicator */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">
                              Join Tournament
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

                        {/* Hover Border Effect */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  View All Tournaments
                </button>
              </div>
            </>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏟️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Tournaments Available
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Stay tuned! Exciting tournaments are coming soon. Be the first
                to know when registration opens.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Notify Me
              </button>
            </div>
          )}
        </div>
        <EmailCollect></EmailCollect>
      </section>

      {/* Enhanced Background Gradient */}
      <div
        className="absolute inset-0 blur-[150px] max-w-4xl h-full mx-auto opacity-20"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(59, 130, 246, 0.4) 15.73%, rgba(147, 51, 234, 0.5) 35.74%, rgba(236, 72, 153, 0.4) 65.49%, rgba(16, 185, 129, 0.3) 85.91%)",
          zIndex: -1,
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-300 opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-700 opacity-50"></div>
    </main>
  );
}
