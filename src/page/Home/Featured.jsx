/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Featured() {
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

  if (isLoading) {
    return (
      <div className="flex flex-wrap -mx-2 px-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 mb-4">
              <div className="bg-slate-900 p-4 rounded-lg animate-pulse h-full">
                <div className="h-40 w-full bg-slate-700 rounded mb-4"></div>
                <div className="h-4 w-1/3 bg-slate-700 rounded mb-2"></div>
                <div className="h-5 w-2/3 bg-slate-700 rounded mb-2"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8 px-4">
        <p className="text-lg">Failed to load tournaments. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="relative bg-nearest-rgb-23-32-49 ">
      <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
        <div className="container px-4 sm:px-6 py-12 sm:py-16 lg:py-24 mx-auto">
          <div className="flex flex-col lg:flex-row w-full mb-8 lg:mb-12">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl title-font mb-2 font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Upcoming{" "}
                <span className="text-white">Events and Tournaments</span>
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-sm sm:text-base">
              Stay updated on our upcoming events and tournaments, where you can
              participate and showcase your skills. Join us for thrilling
              competitions, engaging activities, and memorable experiences.
              Don't miss out on the excitement and opportunities that await you
              at our upcoming events and tournaments.
            </p>
          </div>

          {tournament.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {tournament.map((tur) => (
                <div key={tur._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 mb-4">
                  <Link
                    to={`/tournament-booking/${tur._id}`}
                    className="block h-full"
                  >
                    <div className="bg-slate-900 p-4 rounded-lg h-full transition-transform duration-300 hover:scale-105">
                      <div className="relative overflow-hidden rounded mb-4">
                        <img
                          className="h-auto w-full object-cover object-center rounded"
                          src={tur.cover}
                          alt={tur.tournament_name}
                        />
                      </div>
                      <p className="tracking-widest bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-xs font-medium title-font">
                        REGISTRATION
                      </p>
                      <h2 className="text-sm sm:text-base text-white font-medium title-font mb-2">
                        {tur.tournament_name}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No tournaments currently available.</p>
            </div>
          )}
        </div>
      </section>

      <div
        className="absolute inset-0 blur-[210px] max-w-lg h-[600px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -1,
        }}
      ></div>
    </main>
  );
}