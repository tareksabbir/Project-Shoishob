/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useState } from "react";
import { format, startOfDay } from "date-fns";
import BookingBanner from "./BookingBanner";
import BookingModal from "./BookingModal";
import BookingCard from "./BookingCard";

const BookingHero = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [booking, setBooking] = useState(null);
  const date = format(selectedDate, "PP");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const {
    data: turfs = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turfs", date],
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/turf?date=${date}`
      );
      return response.data.data;
    },
    enabled: !!selectedDate,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300 text-lg">
            Unable to fetch available slots. Please refresh and try again.
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="relative bg-slate-900min-h-screen overflow-hidden">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="fixed z-10 max-w-screen-xl mx-auto px-4 md:px-8"></div>
      <section className="relative z-10">
        {/* Hero Header Section */}
        <section className="relative">
          <div className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              {/* Date Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
                  <svg
                    className="w-5 h-5 text-blue-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z"
                    />
                  </svg>
                  <span className="text-white font-semibold text-lg">
                    {format(selectedDate, "EEEE, MMMM do, yyyy")}
                  </span>
                </div>
              </div>

              {/* Main Title */}
              <div className="text-center mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-tight">
                  Available
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text animate-pulse">
                    Zones
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8" />

                <p className="mx-auto max-w-3xl text-xl text-gray-300 leading-relaxed font-light">
                  Discover premium sports facilities with state-of-the-art
                  amenities.
                  <span className="text-white font-medium">
                    {" "}
                    Book your perfect playing zone
                  </span>{" "}
                  and experience world-class sports infrastructure in your city.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex justify-center space-x-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {turfs.length}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Available Zones
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Open Access
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    Pro
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Grade Facilities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative mx-auto">
          <BookingBanner
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </section>
        {/* Turfs Grid Section */}
        <section className="relative pb-20 ">
          <div className="px-6 mx-auto max-w-screen-2xl">
            {turfs.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Available Slots
                </h3>
                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                  All zones are currently booked for this date. Try selecting a
                  different date to find available slots.
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                  <svg
                    className="w-5 h-5 text-blue-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-300">Try another date</span>
                </div>
              </div>
            ) : (
              <>
                {/* Enhanced Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-18 md:mt-32">
                  {turfs.map((turf, index) => (
                    <div
                      key={turf._id}
                      className="transform transition-all duration-500 hover:scale-105"
                    >
                      <BookingCard turf={turf} setBooking={setBooking} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {booking && (
            <BookingModal
              booking={booking}
              selectedDate={selectedDate}
              setBooking={setBooking}
              refetch={refetch}
            />
          )}
        </section>
      </section>
      
    </main>
  );
};

export default BookingHero;
