/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayZone from "../Home/PlayZone";
import GoBooking from "./GoBooking";
import Heading from "../Home/Heading";
import axios from "axios";

// Loading Skeleton Components
const ImageSkeleton = () => (
  <div className="rounded-lg h-64 overflow-hidden bg-gray-800 animate-pulse">
    <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"></div>
  </div>
);

const ProfileSkeleton = () => (
  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-700 animate-pulse mb-4"></div>
    <div className="flex flex-col items-center text-center justify-center space-y-2">
      <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
      <div className="w-12 h-1 bg-gray-600 rounded animate-pulse"></div>
      <div className="h-3 bg-gray-700 rounded w-32 animate-pulse"></div>
      <div className="h-3 bg-gray-700 rounded w-28 animate-pulse"></div>
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-600 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
    </div>
  </div>
);

const RulesSkeleton = () => (
  <div className="mb-6 border-l-4 border-gray-600 pl-4 lg:mt-5">
    <div className="h-4 bg-gray-700 rounded w-20 animate-pulse mb-2"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-700 rounded w-full animate-pulse"></div>
      <div className="h-3 bg-gray-700 rounded w-4/5 animate-pulse"></div>
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
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`${backendURL}/api/v1/turf/${id}`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });

        setTurfDetails(response.data.data);
      } catch (err) {
        console.error("Error fetching turf details:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load turf details"
        );
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
      <section className="max-w-7xl mx-auto text-gray-600 body-font relative bg-nearest-rgb-23-32-49 min-h-screen">
        <div className=" px-5 py-12 md:py-24 mx-auto flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Loading State
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto text-gray-600 body-font relative bg-nearest-rgb-23-32-49">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-full mx-auto">
            <ImageSkeleton />

            <div className="flex flex-col sm:flex-row mt-10">
              <ProfileSkeleton />
              <ContentSkeleton />
            </div>

            <RulesSkeleton />
          </div>
        </div>

        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -4,
          }}
        />

        {/* Loading skeleton for other components */}
        <div className="h-32 bg-gray-800 animate-pulse rounded-lg mx-5 mb-8"></div>
        <div className="h-64 bg-gray-800 animate-pulse rounded-lg mx-5 mb-8"></div>
      </section>
    );
  }

  // Main Content
  const { cover, logo, turf_name, address, about, rules } = turfDetails || {};

  return (
    <section className="max-w-screen-2xl px-0 md:px-10 mx-auto text-gray-600 body-font relative bg-nearest-rgb-23-32-49">
      <div className="container px-5 py-0 md:py-12 mx-auto flex flex-col">
        <div className="lg:w-full mx-auto">
          {/* Cover Image */}
          <div className="rounded-lg h-[500px] overflow-hidden shadow-2xl">
            <img
              alt={`${turf_name} cover`}
              className="object-cover object-center h-full w-full transition-transform duration-300 hover:scale-105"
              src={cover || "/api/placeholder/800/400"}
              onError={(e) => {
                e.target.src = "/api/placeholder/800/400";
                e.target.alt = "Turf image unavailable";
              }}
            />
          </div>

          {/* Profile and About Section */}
          <div className="flex flex-col sm:flex-row mt-10">
            {/* Profile Section */}
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-700 text-gray-400 shadow-lg">
                <img
                  src={logo || "/api/placeholder/80/80"}
                  alt={`${turf_name} logo`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/80/80";
                    e.target.alt = "Logo unavailable";
                  }}
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-semibold title-font mt-4 text-white text-lg">
                  {turf_name || "Turf Name"}
                </h2>
                <div className="w-12 h-1 bg-cyan-500 rounded mt-2 mb-4"></div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {address && (
                    <>
                      {address}
                      <br />
                      <span className="text-cyan-400">
                        Chittagong, Bangladesh
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-600 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h3 className="text-white font-semibold text-lg mb-3">
                About This Turf
              </h3>
              <p className="leading-relaxed text-gray-300 text-sm mb-4 text-justify">
                {about || "No description available for this turf."}
              </p>
            </div>
          </div>

          {/* Rules Section */}
          {rules && (
            <blockquote className="mb-6 border-l-4 border-cyan-500 pl-4 italic text-gray-400 text-sm md:mb-8 md:pl-6 text-justify lg:mt-5 bg-gray-800/30 py-3 rounded-r-lg">
              <span className="text-cyan-400 font-semibold not-italic">
                Rules:
              </span>
              <br />"{rules}"
            </blockquote>
          )}
        </div>
      </div>

      {/* Background Gradient */}
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -4,
        }}
      />

      {/* Other Components */}
      <Heading />
      <GoBooking />
      <PlayZone />
    </section>
  );
};

export default TurfDetails;
